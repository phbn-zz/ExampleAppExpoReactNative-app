import firebase from '../../services/firebase';
import {
	SESSION_RESTORING,
	SESSION_LOADING,
	SESSION_SUCCESS,
	RESET_LOGIN_CHECK,
	SIGNUP_SUCCESS,
	SESSION_ERROR,
	SESSION_LOADED,
	SESSION_LOGOUT,
	USERINFO_LOADED,
	COMMON_LOADED,
	COMMON_LOADING
} from './types';
import { AsyncStorage } from 'react-native';
import 'firebase/firestore';
import 'firebase/functions';
import {
	show_notification,
	checkoutSpace,
	show_error,
	monitorCheckin
} from './index';
import { Segment, Constants, DangerZone } from 'expo'; // eslint-disable-line
import { store } from '../store';
import { navigate } from '../services/navigator';
import Sentry from 'sentry-expo';

const releaseChannel = Constants.manifest.releaseChannel || 'dev';

const { Branch } = DangerZone;

const sessionRestoring = () => ({
	type: SESSION_RESTORING
});

const sessionLoading = () => ({
	type: SESSION_LOADING
});

const sessionSuccess = user => ({
	type: SESSION_SUCCESS,
	user
});

const resetLoginCheck = () => ({
	type: RESET_LOGIN_CHECK,
	payload: true
});

const signupSuccess = user => ({
	type: SIGNUP_SUCCESS,
	user
});

const sessionLoaded = msg => {
	show_notification(msg);
	return {
		type: SESSION_LOADED,
		payload: msg
	};
};

const sessionError = error => {
	show_error(error);
	return {
		type: SESSION_ERROR,
		payload: error
	};
};

const sessionLogout = () => ({
	type: SESSION_LOGOUT
});

const commonLoaded = () => ({
	type: COMMON_LOADED
});

export const loadAdditionalUserInfo = () => async dispatch => {
	firebase
		.firestore()
		.doc(`users/${firebase.auth().currentUser.uid}`)
		.onSnapshot(
			doc => {
				const userinfo = doc.data();
				if (userinfo && userinfo.customer && userinfo.subscription) {
					dispatch({ type: USERINFO_LOADED, payload: userinfo });
					dispatch(LoginCheck(userinfo));
				}
			},
			e => {
				console.log('failed in onSnapshot for load additional user info', e);
			}
		);
};

export const restoreSession = () => async dispatch => {
	console.log('attempting to restore user session');
	const completedIntro = await AsyncStorage.getItem('completedIntro');

	dispatch(resetLoginCheck());
	dispatch(sessionLoading());
	dispatch(sessionRestoring());

	firebase.auth().onAuthStateChanged(user => {
		if (user) {
			console.log('user session restored with user uid ' + user.uid);
			dispatch(sessionSuccess(user));
			dispatch(loadAdditionalUserInfo());
			dispatch(monitorCheckin());
			//configure sentry for error logging
			Sentry.setUserContext(user);
			Segment.identifyWithTraits(user.uid, {
				email: user.email,
				name: user.displayName
			});
			//only run in production
			//if(releaseChannel.includes("prod")) Branch.userCompletedAction('login', {});
			navigate('map');
		} else {
			dispatch(sessionLogout());
			if (completedIntro) {
				console.log('intro completed');
				navigate('auth');
			} else {
				navigate('welcome');
			}
		}
	});
};

export const loginUser = (email, password) => async dispatch => {
	dispatch(sessionLoading());
	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.catch(error => {
			console.log('caught login error', error);
			dispatch(sessionError(error.message));
			dispatch(commonLoaded());
		});
};

export const loginUserWithToken = token => async dispatch => {
	console.log('logging in user with token');
	dispatch(sessionLoading());
	firebase
		.auth()
		.signInWithCustomToken(token)
		.then(user => {
			dispatch(sessionSuccess(user));
			dispatch(loadAdditionalUserInfo());
			Segment.identifyWithTraits(user.uid, {
				email: user.email,
				name: user.displayName
			});
		})
		.catch(error => {
			console.log('caught login error');
			dispatch(sessionError(error.message));
			dispatch(commonLoaded());
		});
};

export const signupUser = customer => async dispatch => {
	dispatch(sessionLoading());

	firebase
		.functions()
		.httpsCallable('createUser')({ customer })
		.then(response => {
			const newCustomer = response.data;
			console.log(response);
			dispatch(signupSuccess());
			Segment.track('Signup');
			dispatch(loginUser(customer.email, customer.password));
		})
		.catch(error => {
			console.log('caught create user error');
			console.log(error);
			dispatch(commonLoaded());
			dispatch(sessionError(error.message));
		});
};

export const logoutUser = followUpAction => async dispatch => {
	dispatch(sessionLoading());
	//TODO: check out of checked in space, does not work for some reason
	await checkoutSpace();
	//reset segment mobile analytics
	Segment.reset();

	firebase
		.auth()
		.signOut()
		.then(dispatch(sessionLogout()))
		.catch(error => {
			console.log('in logout error');
			dispatch(sessionError(error.message));
		});
};

export const sendPasswordResetEmail = email => async dispatch => {
	dispatch(sessionLoading());
	firebase
		.auth()
		.sendPasswordResetEmail(email)
		.catch(error => {
			sessionError(error.message);
		})
		.then(() =>
			dispatch(sessionLoaded('A link to reset your password has been sent'))
		);
};

export const LoginCheck = userinfo => dispatch => {
	if (store.getState().session.dologincheck) {
		//disable check until enabled by login next time
		dispatch({ type: RESET_LOGIN_CHECK, payload: false });

		// check if user has a card entered - bug user if answer is no
		if (
			userinfo.customer &&
			userinfo.subscription &&
			!userinfo.subscription.plan_id.includes('corporate') &&
			userinfo.customer.card_status === 'no_card' &&
			userinfo.customer.cf_lastcheckin
		) {
			console.log('no card found - redirecting to enter card info');
			Segment.track('promted user to enter creditcard');
			navigate('creditcard');
			show_notification(
				'Complete your profile, by filling in your creditcard information today :)'
			);
		}
	}
};
