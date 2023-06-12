import mapListReducer from '../mapListReducer';
import ACTION_TYPE from '../mapListActionType';
import NotFoundError from '../../../utils/NotFoundError';

/**
 * test case scenario
 * Should return initial state when given by unknown action type
 * Should delete data when given by delete action creator
 * should return [] when map list item doesnt contain keyword
 * should return initialState when keyword value is ''
 * should return searched data in array when given by keyword that match
 * Should return an all datas with new updated data when given by update data action creator
 */

describe('Map List Reducer', () => {
  it('Should return initial state when given by unknown action type', () => {
    const initialState = [{ id: 1, map: 'asd', source: 'test.jpg' }];
    const action = {
      type: 'UNKNOWN ACTION TYPE',
    };

    const reducer = mapListReducer(initialState, action);

    expect(reducer).toEqual(initialState);
    expect(reducer).toHaveLength(initialState.length);
  });
  it('Should return all not deleted data in array when given by delete action creator', () => {
    const initialState = [{ id: 1, map: 'asd', source: 'test.jpg' }, { id: 2, map: 'test', source: 'asd.tiff' }];
    const action = {
      type: ACTION_TYPE.deleteMapListType,
      payload: {
        id: 1,
      },
    };

    const reducer = mapListReducer(initialState, action);
    expect(reducer).toHaveLength(1);
    expect(reducer).toEqual((initialState.filter((mapItem) => mapItem.id !== action.payload.id)));
    expect(reducer).not.toBeNull();
  });
  // it('Should return [] when map list item doesnt contain keyword', () => {
  //   const initialState = [{ id: 1, title: 'asd', source: 'asd.geojson' }, { id: 2, title: 'test', source: 'test.tiff' }];
  //   const action = {
  //     type: ACTION_TYPE.searchMapListType,
  //     payload: {
  //       keyword: 'NOT FOUND KEYWORD',
  //     },
  //   };

  //   const reducer = mapListReducer(initialState, action);
  //   expect(reducer).toHaveLength(0);
  //   expect(reducer).toEqual([]);
  // });
  // it('Should return initialState when value is ""', () => {
  //   const initialState = [{ id: 1, title: 'asd', source: 'asd.geojson' }, { id: 2, title: 'test', source: 'test.tiff' }];
  //   const action = {
  //     type: ACTION_TYPE.searchMapListType,
  //     payload: {
  //       keyword: '',
  //     },
  //   };

  //   // should fix, because state is not predictable
  //   const reducer = mapListReducer(initialState, action);
  //   expect(reducer).toHaveLength(2);
  // });
  // it('Should return searched data in array when given by match keyword', () => {
  //   const initialState = [{ id: 1, title: 'asd', source: 'asd.geojson' }, { id: 2, title: 'test', source: 'test.tiff' }];
  //   const action = {
  //     type: ACTION_TYPE.searchMapListType,
  //     payload: {
  //       keyword: 'test',
  //     },
  //   };

  //   const reducer = mapListReducer(initialState, action);
  //   const searchedData = initialState.filter(
  //     (mapItem) => mapItem.map.toLowerCase().includes(action.payload.keyword.toLowerCase()),
  //   );

  //   expect(reducer).toHaveLength(1);
  //   expect(reducer).toEqual(searchedData);
  //   expect(searchedData).toHaveProperty('map');
  // });
  // it('Should return all data with new data when given by update action creator', () => {
  //   const initialState = [{ id: 1, title: 'asd', source: 'asd.geojson' }, { id: 2, title: 'test', source: 'test.tiff' }];
  //   const newData = {
  //     map: 'map baru',
  //     fileSource: 'source baru',
  //   };
  //   const action = {
  //     type: ACTION_TYPE.putMapListType,
  //     payload: {
  //       id: 2,
  //       newData: {
  //         ...newData,
  //       },
  //     },
  //   };
  //   const filterState = initialState.filter((value) => value.id === action.payload.id)[0];

  //   const reducer = mapListReducer(initialState, action);

  //   expect(reducer).toEqual(
  //     [{
  //       ...filterState,
  //       title: action.payload.newData.map,
  //       source: action.payload.newData.fileSource,
  //     }, ...initialState.filter((value) => value.id !== action.payload.id)],
  //   );
  //   expect(reducer).toHaveLength(2);
  // });
  // it('Should return initial state with new data when given by add action creator', () => {
  //   const initialState = [{ id: 1, title: 'asd', source: 'asd.geojson' }, { id: 2, title: 'test', source: 'test.tiff' }];
  //   const action = {
  //     type: ACTION_TYPE.addMapListType,
  //     payload: {
  //       newData: {
  //         id: 'asdsa',
  //         map: 'map data baru',
  //         source: 'mapBaru.tiff',
  //       },
  //     },
  //   };

  //   const nextState = mapListReducer(initialState, action);
  //   expect(nextState).toHaveLength(3);
  //   expect(nextState).toEqual([
  //     { id: action.payload.id, title: action.payload.map, source: action.payload.source },
  //     ...initialState]);
  // });
  it('Should update given data to id to be update when given by putMapListType', () => {
    // action
    const initialState = [{
      id: 1, name: 'asd', title: 'asd', type: 'GeoTIFF', url: 'http://192.168.6.69:8000/geoserver/MSIB/wms',
    },
    {
      id: 2, name: 'Jawa Barat', title: 'Jawa Barat', type: 'GeoTIFF', url: 'http://192.168.6.69:8000/geoserver/MSIB/wms',
    }];
    const newData = {
      id: 1,
      name: 'Jawa Timur',
      title: 'Jawa Timur',
      url: 'new URL',
      type: 'WMS',
    };

    const actionCreator = {
      type: ACTION_TYPE.putMapListType,
      payload: {
        id: newData.id,
        newData: { ...newData },
      },
    };

    // action
    const nextState = mapListReducer(initialState, actionCreator);
    const newUpdatedData = initialState.map((map) => {
      if (map.id === actionCreator.payload.id) {
        return {
          ...map,
          ...actionCreator.payload.newData,
        };
      }
      return map;
    });

    // assert
    expect(nextState).toEqual(newUpdatedData);
  });
});
