import ACTION_TYPE from './loaderType';

const initialState = false;

const loaderReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ACTION_TYPE.setLoader:
      return action.payload.value;
    default:
      return state;
  }
};

export default loaderReducer;
