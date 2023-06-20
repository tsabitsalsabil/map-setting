import ACTION_TYPE from './actionType';

const initialState = [];

const mapSearchReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ACTION_TYPE.searchMap:
      return [action.payload.mapItem];
    default:
      return state;
  }
};
export default mapSearchReducer;
