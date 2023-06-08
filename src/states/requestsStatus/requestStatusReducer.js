import ACTION_TYPE from './requestStatusActionType';

const initialState = {
  error: false,
  message: '',
  load: false,
};

const requestStatusReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ACTION_TYPE.fetchData:
      return {
        ...initialState,
        load: true,
      };
    case ACTION_TYPE.fetchDataFailed:
      return {
        load: false,
        error: true,
        message: action.payload.message,
      };
    default:
      return state;
  }
};

export default requestStatusReducer;
