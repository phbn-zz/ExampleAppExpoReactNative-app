import { persistCombineReducers } from 'redux-persist';
import space from './spaceReducer';
import stat from './statReducer';
import session from './sessionReducer';
import storage from 'redux-persist/lib/storage';
import notifications from './notificationReducer';
import profiles from './profileReducer';
import common from './commonReducer';
import review from './ReviewReducer';
import redeem from './redeemReducer';
import appReview from './appReviewReducer';

export default persistCombineReducers(
  { key: 'root', storage },
  {
    common,
    space,
    stat,
    session,
    notifications,
    profiles,
    review,
    redeem,
    appReview
  }
);
