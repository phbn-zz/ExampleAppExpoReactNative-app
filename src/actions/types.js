/** Notifications */
export const SHOW_NOTIFICATION = 'show_notification';
export const SHOW_WARNING = 'show_warning';
export const SHOW_ERROR = 'show_error';

/**Space types */
export const FETCH_SPACES = 'fetch_spaces';
export const CHECKIN_SPACE = 'checkin_space';
export const CHECKOUT_SPACE = 'checkout_space';
export const FETCH_SPACE = 'fetch_space';
export const FETCH_CHECKINS = 'fetch_checkins';
export const CHECKIN_LOADING = 'checkin_loading';
export const CHECKIN_ERROR = 'checkin_error';
export const SET_LOCATION = 'set_location';
export const SET_NEAREST_SPACE = 'set_nearest_space';
export const SET_GUESTS = 'set_guests';
export const LOCATION_AVAILABLE = 'location_available';

/**Session types */
export const SESSION_RESTORING = 'SESSION_RESTORING';
export const SESSION_LOADING = 'SESSION_LOADING';
export const SESSION_SUCCESS = 'SESSION_SUCCESS';
export const SESSION_ERROR = 'session_error';
export const SESSION_LOGOUT = 'SESSION_LOGOUT';
export const LOGIN_SUCCESS = 'login_success';
export const LOGIN_FAIL = 'login_fail';
export const SIGNUP_SUCCESS = 'signup_success';
export const SIGNUP_FAIL = 'signup_fail';
export const SESSION_LOADED = 'session_loaded';
export const USERINFO_LOADED = 'userinfo_loaded';
export const RESET_LOGIN_CHECK = 'reset_login_check';

/**Notifications */
export const FETCH_NOTIFICATIONS = 'fetch_notifications';
export const UNREAD_NOTIFICATIONS = 'unread_notifications';
export const READ_ALL_NOTIFICATIONS = 'read_all_notifications';
export const NOTIFICATION_LOADING = 'notification_loading';
export const NOTIFICATION_ERROR = 'notification_error';
export const RECEIVED_NOTIFICATION = 'received_notification';

/**Common */
export const COMMON_LOADING = 'common_loading';
export const COMMON_LOADED = 'common_loaded';

/** Profiles */
export const FETCH_CHECKEDIN_PROFILES = 'fetch_checkedin_profiles';
export const UNSEEN_CHECKEDIN_PROFILES = 'unseen_checkedin_profiles';
export const SEE_ALL_PROFILES = 'see_all_profiles';

/** Permissions */
export const LOCATION_PERMISSION = 'location_permitted';
export const CAMERA_PERMISSION = 'camera_permitted';
export const CAMERAROLL_PERMISSION = 'cameraroll_permitted';
export const CONTACTS_PERMISSION = 'contacts_permitted';
export const NOTIFICATIONS_PERMISSION = 'notifications_permitted';

export const ReviewActionTypes = {
  Fetch: 'review_Fetch',
  Add: 'review_Add',
  Remove: 'review_Remove',
  Success: 'review_Success',
  Failed: 'review_Failed',
  Reset: 'review_Reset',
  Start: 'review_Start'
};

export const AppReviewActionTypes = {
  Fetch: 'App_Review_Fetch',
  Add: 'App_Review_Add',
  Remove: 'App_Review_Remove',
  Success: 'App_Review_Success',
  Failed: 'App_Review_Failed',
  Reset: 'App_Review_Reset',
  Start: 'App_Review_Start',
  Update: 'App_Review_Update'
};

/** RedeemTypes */
export const RedeemActionTypes = {
  Redeem: 'redeem',
  Fetch: 'redeem_fetch',
  Refresh: 'redeem_refresh'
};
