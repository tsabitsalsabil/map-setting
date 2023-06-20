import ACTION_TYPE from '../actionType';
import mapSearchReducer from '../mapSearchReducer';

describe('Map Search Reducer', () => {
  it('Should return initial state when given by unknown action creator', () => {
    // arrange
    const initialState = [];
    const actionCreator = {
      type: 'UNKNOWN ACTION CREATOR',
    };

    // action
    const nextState = mapSearchReducer(initialState, actionCreator);

    // assert
    expect(nextState).toEqual(initialState);
  });
  it('Should return finded data when given by search map type', () => {
    const initialState = [];
    const actionCreator = {
      type: ACTION_TYPE.searchMap,
      payload: {
        mapItem: {
          id: 1,
          title: 'Jawa Barat',
          source: 'https://192.152.14:8000/basemaps/wms',
        },
      },
    };

    // action
    const nextState = mapSearchReducer(initialState, actionCreator);

    // assert
    expect(nextState).toEqual([actionCreator.payload.mapItem]);
    expect(nextState).toHaveLength(1);
  });
});
