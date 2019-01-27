import { combineReducers } from 'redux';
import session from './sessionReducer';
import profiles from './profileReducer';
import common from './commonReducer';

export default combineReducers({
	common,
	session,
	profiles
});
