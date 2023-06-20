/* eslint-disable import/prefer-default-export */
import ACTION_TYPE from './loaderType';

export const toggleLoader = (isLoading, message = '') => ({
  type: ACTION_TYPE.setLoader,
  payload: {
    message,
    isLoading,
  },
});
