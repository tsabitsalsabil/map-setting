/* eslint-disable import/prefer-default-export */
import ACTION_TYPE from './searchedMapType';

export const setSearchedMapActionCreator = (payload) => ({
  type: ACTION_TYPE.setSearchedMap,
  payload,
});
