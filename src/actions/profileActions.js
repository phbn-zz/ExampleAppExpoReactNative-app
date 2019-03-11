import firebaseService from '../services/firebase';
import {
	SEE_ALL_PROFILES,
	FETCH_CHECKEDIN_PROFILES,
	UNSEEN_CHECKEDIN_PROFILES
} from './types';
import { store } from '../store/store';
import { Keyboard } from 'react-native';

export const updateProfile = profile => async () => {
	Keyboard.dismiss();
	let checkin_id = null;
	//loading statement? so far the update is silent

	//check if there is a space the user is checked in to in the database and send that id with the request (safety issue?)
	if (store.getState().space.checked_in_space) {
		checkin_id = store.getState().space.checked_in_space.checkin_id;
	}
	// update
	await firebaseService.functions().httpsCallable('updateProfile')({
		profile,
		checkin_id
	});
};

export const getCheckedInProfiles = () => async dispatch => {
	// const { currentUser } = firebase.auth();
	//get checked in space from store
	const spaceid = await store.getState().space.checked_in_space.space_id;

	//reset unseen before setting up listener
	dispatch({ type: SEE_ALL_PROFILES, payload: 0 });
	// const unsubscribe =
	firebaseService
		.firestore()
		.collection('/checkins/')
		.where('space_id', '==', spaceid)
		.where('checkout', '==', null)
		.where('profile.visible', '==', true)
		//.where("user",">",currentUser.uid)
		.orderBy('timestamp', 'desc')
		.onSnapshot(
			snapshot => {
				let unseenprofiles = 0;
				//update the button if new users are added, that are not seen by the user
				snapshot.docChanges().forEach(change => {
					if (change.type === 'added') {
						unseenprofiles += 1;
					}
				});
				dispatch({
					type: FETCH_CHECKEDIN_PROFILES,
					payload: snapshot.docs
						.filter(doc => doc.data().profile && doc.data().profile.visible)
						.map(doc => doc.data().profile)
				});
				dispatch({
					type: UNSEEN_CHECKEDIN_PROFILES,
					payload: unseenprofiles
				});
			},
			e => {
				console.log('failed in onSnapshot for getprofiles', e);
			}
		);
};

export const resetUnseenProfiles = () => async dispatch => {
	dispatch({ type: SEE_ALL_PROFILES, payload: {} });
};
