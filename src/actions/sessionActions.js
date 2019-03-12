import firebaseService from "../services/firebase";
import NavigationService from "../services/NavigationService";
import {
  SESSION_LOADING,
  SESSION_SUCCESS,
  SIGNUP_SUCCESS,
  SESSION_ERROR,
  SESSION_LOADED,
  SESSION_LOGOUT,
  USERINFO_LOADED,
  COMMON_LOADED,
  COMMON_LOADING
} from "./types";
import "firebase/firestore";
import "firebase/functions";
import { show_notification, show_error } from "./index";
import HomeScreen from "../screens/HomeScreen";

const userInfo = userData => {
  console.log(userData);
  return { type: USERINFO_LOADED, payload: userData };
};

const sessionLoading = () => ({
  type: SESSION_LOADING
});

const sessionSuccess = user => ({
  type: SESSION_SUCCESS,
  user
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

export const loadUserInfo = () => async dispatch => {
  firebaseService
    .firestore()
    .doc(`users/${firebaseService.auth().currentUser.uid}`)
    .onSnapshot(
      doc => {
        const userData = doc.data();
        console.log(userData);
        dispatch(userInfo(userData));
      },
      function(error) {
        console.log("Snapshot of user data unavailable", error);
        return null;
      }
    );
};

export const loginUser = (email, password) => async dispatch => {
  dispatch(sessionLoading());
  firebaseService
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      dispatch(loadUserInfo());
      dispatch(commonLoaded());
      NavigationService.navigate("home");
    })
    .catch(error => {
      console.log("caught login error", error);
      dispatch(sessionError(error.message));
      dispatch(commonLoaded());
    });
};

export const loginUserWithToken = token => async dispatch => {
  console.log("logging in user with token");
  dispatch(sessionLoading());
  firebaseService
    .auth()
    .signInWithCustomToken(token)
    .then(user => {
      dispatch(sessionSuccess(user));
      dispatch(loadUserInfo());
      dispatch(commonLoaded());
      NavigationService.navigate("home");
    })
    .catch(error => {
      console.log("caught login error");
      dispatch(sessionError(error.message));
      dispatch(commonLoaded());
    });
};

export const signupUser = customer => async dispatch => {
  dispatch(sessionLoading());

  firebaseService
    .functions()
    .httpsCallable("createUser")({ customer })
    .then(response => {
      console.log(response.data);
      const newCustomer = response.data;
      console.log(response);
      dispatch(signupSuccess());
      dispatch(loginUser(customer.email, customer.password));
    })
    .catch(error => {
      console.log("caught create user error");
      console.log(error);
      dispatch(commonLoaded());
      dispatch(sessionError(error.message));
    });
};

export const logoutUser = () => async dispatch => {
  dispatch(sessionLoading());
  firebaseService
    .auth()
    .signOut()
    .then(() => {
      dispatch(sessionLogout());
      console.log("User signed out");
      NavigationService.navigate("authWelcome");
    })
    .catch(error => {
      console.log("in logout error");
      dispatch(sessionError(error.message));
    });
};

export const sendPasswordResetEmail = email => async dispatch => {
  dispatch(sessionLoading());
  firebaseService
    .auth()
    .sendPasswordResetEmail(email)
    .catch(error => {
      sessionError(error.message);
    })
    .then(() =>
      dispatch(sessionLoaded("A link to reset your password has been sent"))
    );
};
