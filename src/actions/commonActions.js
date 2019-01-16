import { COMMON_LOADING, COMMON_LOADED } from './types';

const commonLoading = () => ({
  type: COMMON_LOADING
});

const commonLoaded = () => ({
  type: COMMON_LOADED
});

export const commonLoadingStatus = status => dispatch => {
  if (status === true) {
    console.log('Setting commonLoading TRUE');
    dispatch(commonLoading());
  } else {
    console.log('Setting commonLoading FALSE');
    dispatch(commonLoaded());
  }
};

export const notCommonLoading = status => dispatch => {
  if (status === true) {
    dispatch(commonLoading());
  } else {
    dispatch(commonLoaded());
  }
};
