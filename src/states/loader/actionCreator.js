/* eslint-disable import/prefer-default-export */
import ACTION_TYPE from './loaderType';

export const toggleLoader = (value) => ({
  type: ACTION_TYPE.setLoader,
  payload: {
    value,
  },
});
