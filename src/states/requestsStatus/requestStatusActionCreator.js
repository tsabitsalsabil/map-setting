import ACTION_TYPE from './requestStatusActionType';

export const fetchDataActionCreator = () => ({
  type: ACTION_TYPE.fetchData,
});

export const fetchDataFailedActionCreator = (message) => ({
  type: ACTION_TYPE.fetchDataFailed,
  payload: {
    message,
  },
});
