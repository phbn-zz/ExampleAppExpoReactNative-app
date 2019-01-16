import {
  FETCH_CHECKEDIN_PROFILES,
  UNSEEN_CHECKEDIN_PROFILES,
  SEE_ALL_PROFILES
} from '../actions/types';

export default function(
  state = { checked_in_profiles: [], unseen_profiles: 0 },
  action
) {
  switch (action.type) {
    case FETCH_CHECKEDIN_PROFILES:
      return { ...state, checked_in_profiles: action.payload };
    case UNSEEN_CHECKEDIN_PROFILES:
      return {
        ...state,
        unseen_profiles: action.payload + state.unseen_profiles
      };
    case SEE_ALL_PROFILES:
      return { ...state, unseen_profiles: 0 };
    default:
      return state;
  }
}
