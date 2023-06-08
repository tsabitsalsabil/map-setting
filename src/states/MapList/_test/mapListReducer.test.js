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

const fakeErrorMessage = new NotFoundError("Not Found: Can't Find Basemap Data...");

describe('Map List Reducer', () => {
  it('Should return initial state when given by unknown action type', () => {
    const initialState = [{ no: 1, map: 'asd', source: 'test.jpg' }];
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
  it('Should return [] when map list item doesnt contain keyword', () => {
    const initialState = [{ no: 1, map: 'asd', source: 'asd.geojson' }, { no: 2, map: 'test', source: 'test.tiff' }];
    const action = {
      type: ACTION_TYPE.searchMapListType,
      payload: {
        keyword: 'NOT FOUND KEYWORD',
      },
    };

    const reducer = mapListReducer(initialState, action);
    expect(reducer).toHaveLength(0);
    expect(reducer).toEqual([]);
  });
  it('Should return initialState when value is ""', () => {
    const initialState = [{ no: 1, map: 'asd', source: 'asd.geojson' }, { no: 2, map: 'test', source: 'test.tiff' }];
    const action = {
      type: ACTION_TYPE.searchMapListType,
      payload: {
        keyword: '',
      },
    };

    // should fix, because state is not predictable
    const reducer = mapListReducer(initialState, action);
    expect(reducer).toHaveLength(0);
  });
  it('Should return searched data in array when given by match keyword', () => {
    const initialState = [{ no: 1, map: 'asd', source: 'asd.geojson' }, { no: 2, map: 'test', source: 'test.tiff' }];
    const action = {
      type: ACTION_TYPE.searchMapListType,
      payload: {
        keyword: 'test',
      },
    };

    const reducer = mapListReducer(initialState, action);
    const searchedData = initialState.filter(
      (mapItem) => mapItem.map.toLowerCase().includes(action.payload.keyword.toLowerCase()),
    );

    expect(reducer).toHaveLength(1);
    expect(reducer).toEqual(searchedData);
    expect(searchedData).toHaveProperty('map');
  });
  it('Should return all data with new data when given by update action creator', () => {
    const initialState = [{ no: 1, map: 'asd', source: 'asd.geojson' }, { no: 2, map: 'test', source: 'test.tiff' }];
    const newData = {
      map: 'map baru',
      fileSource: 'source baru',
    };
    const action = {
      type: ACTION_TYPE.putMapListType,
      payload: {
        id: 2,
        newData: {
          ...newData,
        },
      },
    };
    const filterState = initialState.filter((value) => value.no === action.payload.id)[0];

    const reducer = mapListReducer(initialState, action);

    expect(reducer).toEqual(
      [{
        ...filterState,
        map: action.payload.newData.map,
        source: action.payload.newData.fileSource,
      }, ...initialState.filter((value) => value.no !== action.payload.id)],
    );
    expect(reducer).toHaveLength(2);
  });
  it('Should return initial state with new data when given by add action creator', () => {
    const initialState = [{ no: 1, map: 'asd', source: 'asd.geojson' }, { no: 2, map: 'test', source: 'test.tiff' }];
    const action = {
      type: ACTION_TYPE.addMapListType,
      payload: {
        newData: {
          id: 'asdsa',
          map: 'map data baru',
          source: 'mapBaru.tiff',
        },
      },
    };

    const nextState = mapListReducer(initialState, action);
    expect(nextState).toHaveLength(3);
    expect(nextState).toEqual([
      { no: action.payload.id, map: action.payload.map, source: action.payload.source },
      ...initialState]);
  });
});
