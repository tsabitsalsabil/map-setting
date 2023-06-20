/* eslint-disable import/prefer-default-export */
import ACTION_TYPE from './actionType';

export const searchMap = (mapItem) => ({
  type: ACTION_TYPE.searchMap,
  payload: {
    mapItem,
  },
});
