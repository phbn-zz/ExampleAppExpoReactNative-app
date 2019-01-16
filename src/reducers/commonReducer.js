import { COMMON_LOADING, COMMON_LOADED } from '../actions/types';

export default function(state = { loading: false }, action) {
  switch (action.type) {
    case COMMON_LOADING:
      return { ...state, loading: true };
    case COMMON_LOADED:
      return { ...state, loading: false };
    default:
      return state;
  }
}
