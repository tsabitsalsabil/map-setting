import ACTION_TYPE from './loaderType';

const initialState = {
  message: '',
  isLoading: false,
};

const loaderReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ACTION_TYPE.setLoader:
      return {
        message: action.payload.message,
        isLoading: action.payload.isLoading,
      };
    default:
      return state;
  }
};

export default loaderReducer;
