import ACTION_TYPE from './searchedMapType';

const initialState = [];
const searchedMapReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ACTION_TYPE.setSearchedMap:
      return [...action.payload];
    default:
      return state;
  }
};

export default searchedMapReducer;
