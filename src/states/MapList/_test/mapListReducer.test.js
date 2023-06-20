import mapListReducer from '../mapListReducer';
import ACTION_TYPE from '../mapListActionType';

/**
 * test case scenario
 * Should return initial state when given by unknown action type
 * Should delete data when given by delete action creator
 * should return find data when keyword value is match
 * Should return an all datas with new updated data when given by update data action creator
 * Should return [] when map list item doesnt find an item
 * Should return finded data when given category=title an query on input search
 * Should return finded data when given category=source an query on input search
 * Should return data fetched, when given by getMaplistType
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
  it('Should return [] when map list item doesnt find an item', () => {
    const initialState = [{ id: 1, title: 'asd', source: 'asd.geojson' }, { id: 2, title: 'test', source: 'test.tiff' }];
    const action = {
      type: ACTION_TYPE.searchMapListType,
      payload: {
        query: 'NOT FOUND KEYWORD',
        category: 'all',
      },
    };

    const reducer = mapListReducer(initialState, action);
    console.log({ reducer });
    expect(reducer).toHaveLength(0);
    expect(reducer).toEqual([]);
  });
  it('should return find data when keyword value is match', () => {
    // arrange
    const initialState = [
      { id: 1, title: 'asd', source: 'asd.geojson' },
      { id: 2, title: 'test', source: 'test.tiff' },
      { id: 3, title: 'testa', source: 'cek.wms' }];
    const actionCreator = {
      type: ACTION_TYPE.searchMapListType,
      payload: {
        category: 'all',
        query: 'test',
      },
    };

    // action
    const nextState = mapListReducer(initialState, actionCreator);

    const findedData = initialState.filter(
      (mapData) => mapData.title.toLowerCase().includes(actionCreator.payload.query.toLowerCase()) || mapData.source.toLowerCase().includes(actionCreator.payload.query.toLowerCase()),
    );
    // assert
    expect(nextState).toEqual(findedData);
    expect(nextState).toHaveLength(2);
  });
  it('Should return finded data when given category an query on input search', () => {
    // arrange
    const initialState = [
      { id: 1, title: 'asd', source: 'asd.geojson' },
      { id: 2, title: 'test', source: 'test.tiff' },
      { id: 3, title: 'testa', source: 'cek.wms' }];
    const actionCreator = {
      type: ACTION_TYPE.searchMapListType,
      payload: {
        category: 'source',
        query: 'test',
      },
    };
    const nextState = mapListReducer(initialState, actionCreator);

    // assert
    expect(nextState).toEqual([initialState[1]]);
    expect(nextState).toHaveLength(1);
  });
  it('Should return [] when searched data with category = source and query is not found', () => {
    // arrange
    const initialState = [
      { id: 1, title: 'asd', source: 'asd.geojson' },
      { id: 2, title: 'test', source: 'test.tiff' },
      { id: 3, title: 'testa', source: 'cek.wms' }];
    const actionCreator = {
      type: ACTION_TYPE.searchMapListType,
      payload: {
        category: 'source',
        query: 'apa aja',
      },
    };
    const nextState = mapListReducer(initialState, actionCreator);

    // assert
    expect(nextState).toEqual([]);
  });
  it('Should return [] when searched data with category = source and query is not found', () => {
    // arrange
    const initialState = [
      { id: 1, title: 'asd', source: 'asd.geojson' },
      { id: 2, title: 'test', source: 'test.tiff' },
      { id: 3, title: 'testa', source: 'cek.wms' }];
    const actionCreator = {
      type: ACTION_TYPE.searchMapListType,
      payload: {
        category: 'title',
        query: 'apa aja',
      },
    };
    const nextState = mapListReducer(initialState, actionCreator);

    // assert
    expect(nextState).toEqual([]);
  });

  it('Should return finded data when given category an query on input search', () => {
    // arrange
    const initialState = [
      { id: 1, title: 'asd', source: 'asd.geojson' },
      { id: 2, title: 'test', source: 'test.tiff' },
      { id: 3, title: 'testa', source: 'cek.wms' }];
    const actionCreator = {
      type: ACTION_TYPE.searchMapListType,
      payload: {
        category: 'title',
        query: 'asd',
      },
    };
    const nextState = mapListReducer(initialState, actionCreator);

    // assert
    expect(nextState).toEqual([initialState[0]]);
    expect(nextState).toHaveLength(1);
  });
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
    const newMapData = [];
    initialState.map((map) => {
      if (map.id === actionCreator.payload.id) {
        map.id = actionCreator.payload.newData.id;
        map.name = actionCreator.payload.newData.name;
        map.title = actionCreator.payload.newData.title;
        map.type = actionCreator.payload.newData.type;
        map.url = actionCreator.payload.newData.url;
      }
      newMapData.push(map);
    });
    // assert
    expect(nextState).toEqual(newMapData);
  });
  it('Should return data fetched, when given by getMaplistType', () => {
    // arrange
    const initialState = [];
    const actionCreator = {
      type: ACTION_TYPE.getMapListType,
      payload: {
        mapList: [{
          id: 1, name: 'asd', title: 'asd', type: 'GeoTIFF', url: 'http://192.168.6.69:8000/geoserver/MSIB/wms',
        },
        {
          id: 2, name: 'Jawa Barat', title: 'Jawa Barat', type: 'GeoTIFF', url: 'http://192.168.6.69:8000/geoserver/MSIB/wms',
        }],
      },

    };
    // action
    const nextState = mapListReducer(initialState, actionCreator);

    // assert
    expect(nextState).toEqual(actionCreator.payload.mapList);
  });
});
