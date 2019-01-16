import {
  SESSION_RESTORING,
  SESSION_LOADING,
  SESSION_SUCCESS,
  SESSION_ERROR,
  SESSION_LOGOUT,
  SESSION_LOADED,
  USERINFO_LOADED,
  SIGNUP_SUCCESS,
  RESET_LOGIN_CHECK
} from '../actions/types';

const initialState = {
  restoring: false,
  loading: false,
  user: {},
  error: null,
  logged: null,
  registered: null,
  customer: null,
  subscription: null,
  profile: null,
  dologincheck: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SESSION_RESTORING:
      return { ...state, restoring: true, error: null };
    case SESSION_LOADING:
      return { ...state, restoring: false, loading: true, error: null };
    case SESSION_SUCCESS:
      return {
        ...state,
        restoring: false,
        loading: false,
        user: action.user,
        error: null,
        logged: true
      };
    case USERINFO_LOADED: {
      const customer = action.payload.customer
        ? action.payload.customer
        : { ...state.customer };
      const subscription = action.payload.subscription
        ? action.payload.subscription
        : { ...state.subscription };
      const profile = action.payload.profile
        ? action.payload.profile
        : { ...state.profile };
      return { ...state, customer, subscription, profile };
    }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        restoring: false,
        loading: false,
        error: null,
        logged: null,
        registered: true
      };
    case SESSION_ERROR:
      return {
        ...state,
        restoring: false,
        loading: false,
        user: null,
        error: action.payload,
        logged: null,
        registered: null
      };
    case SESSION_LOADED:
      return { ...state, loading: false };
    case SESSION_LOGOUT:
      return initialState;
    case RESET_LOGIN_CHECK:
      return { ...state, dologincheck: action.payload };
    default:
      return state;
  }
}
