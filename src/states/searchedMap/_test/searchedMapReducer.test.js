/**
 * test case
 * Should return initial state when given by unknown action creator
 * Should return finded data when given by set searched map type
 */

import searchedMapReducer from '../searchedMapReducer';
import ACTION_TYPE from '../searchedMapType';

describe('Searched Map Reducer', () => {
  it('Should return initial state when given by unknown action creator', () => {
    // arrange
    const initialState = [];
    const actionCreator = {
      type: 'UNKNOWN ACTION CREATOR',
    };

    // action
    const nextState = searchedMapReducer(initialState, actionCreator);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('Should return finded data when given by set searched map type', () => {
    // arrange
    const initialState = [];
    const actionCreator = {
      type: ACTION_TYPE.setSearchedMap,
      payload: [
        {
          id: '1', name: 'Jawa Barat', title: 'Jawa Barat', type: 'WMS', url: 'http://172.16.6.177:8000/geoserver/MSIB/wms',
        },
      ],
    };

    // action
    const nextState = searchedMapReducer(initialState, actionCreator);

    // assert
    expect(nextState).toEqual([...actionCreator.payload]);
  });
});
