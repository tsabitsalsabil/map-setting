import api from '../../../api/api';
import mapListReducer from '../mapListReducer';
import { fetchDataActionCreator, fetchDataFailedActionCreator } from '../../requestsStatus/requestStatusActionCreator';
import {
  addMapListActionCreator,
  asyncAddMapListActionCreator, asyncGetMaplistActionCreator, fetchMapActionCreator, modalAddSuccessToggleActionCreator, modalEditSuccessToggleActionCreator,
} from '../..';
import { asyncAddMapListFromOnlineSourceActionCreator, asyncUpdateMapListActionCreator } from '../actionCreator';
/**
 * Should dispatch correctly when get data failed
 * Should dispatch correctly when get data is succeed
 * Should dispatch correctly When add map data from local source
 * Should Dispatch correctly when update data is failed
 * Should dispatch correctly when update data is succeed
 */

describe('Map List Thunk Test', () => {
  beforeEach(() => {
    api._fetchMapListData = api.fetchMapListData;
    api._addMapListData = api.addMapListData;
    api._updateMapListData = api.updateMapListData;
    api._addMapListDataFromOnlineSource = api.addMapListDataFromOnlineSource;
  });
  afterEach(() => {
    api.fetchMapListData = api._fetchMapListData;
    api.addMapListData = api._addMapListData;
    api.updateMapListData = api._updateMapListData;
    api.addMapListDataFromOnlineSource = api._addMapListDataFromOnlineSource;

    delete api._fetchMapListData;
    delete api._addMapListData;
    delete api._updateMapListData;
    delete api._addMapListDataFromOnlineSource;
  });
  it('Should dispatch correctly when get data', async () => {
    // arrange
    const fakeErrorResponse = {
      error: true,
      message: 'Fetch data failed',
    };
    api.fetchMapListData = () => fakeErrorResponse;
    const dispatch = jest.fn();

    await asyncGetMaplistActionCreator()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(fetchDataActionCreator());
    expect(dispatch).toHaveBeenCalledWith(fetchDataFailedActionCreator(fakeErrorResponse.message));
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
  it('Should dispatch correctly when data fetch is succeed', async () => {
    // arrange
    const dispatch = jest.fn();
    const fakeResponse = {
      success: true,
      data: [
        {
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          name: 'string',
          title: 'string',
          url: 'string',
          type: 'string',
          created_at: '2023-06-09T04:36:47.201Z',
          updated_at: '2023-06-09T04:36:47.201Z',
        },
      ],
      total: 0,
    };
    api.fetchMapListData = () => fakeResponse;

    // action
    await asyncGetMaplistActionCreator()(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(fetchDataActionCreator());
    expect(dispatch).toHaveBeenCalledWith(fetchMapActionCreator(fakeResponse));
  });
  it('Should dispatch correctly When add map data from local source', async () => {
    // arrange
    const dataToAdd = {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
      name: 'apa aja',
      title: 'apa aja',
      url: 'apa aja',
      type: 'apa aja',
      created_at: '2023-06-09T04:36:47.201Z',
      updated_at: '2023-06-09T04:36:47.201Z',
    };
    const fakeResponseSuccess = {
      success: true,
      data: {
        id: dataToAdd.id,
        url: dataToAdd.url,
      },
    };
    api.addMapListData = () => fakeResponseSuccess.data.id;
    const dispatch = jest.fn();
    // action
    await asyncAddMapListActionCreator({
      map: dataToAdd.title,
      uploadedFile: dataToAdd.url,
      fileType: dataToAdd.type,
    })(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(addMapListActionCreator({ id: fakeResponseSuccess.data.id, map: dataToAdd.title }));
    expect(dispatch).toHaveBeenCalledWith(modalAddSuccessToggleActionCreator(fakeResponseSuccess.success));
  });
  it('Should dispatch correctly when update map data is failed', async () => {
    // arrange
    const dataToUpdated = {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
    };
    const fakeErrorResponse = {
      success: false,
      message: 'Bad Request: Can\t Handle Basemap Data...',
    };
    api.updateMapListData = () => fakeErrorResponse;
    const dispatch = jest.fn();
    // action
    await asyncUpdateMapListActionCreator(dataToUpdated.id, {
      ...dataToUpdated,
      name: 'ubah',
      title: 'name',
      url: 'url baru',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(fetchDataFailedActionCreator(fakeErrorResponse.message));
  });
  it('Should dispatch correctly when update map data is succeed', async () => {
    // assert
    const fakeResponse = {
      success: true,
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    };
    api.updateMapListData = () => fakeResponse;
    const dispatch = jest.fn();

    // action
    await asyncUpdateMapListActionCreator(fakeResponse.id, {
      file: 'asd', name: 'asd', title: 'asd', type: 'asd',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(modalEditSuccessToggleActionCreator(fakeResponse.success));
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
  it('Should Dispatch Correctly when add map list data from online source failed', async () => {
    // arrange
    const fakeErrorResponse = {
      message: 'Bad Request: Can\'t Handle Basemap Data...',
    };
    const dispatch = jest.fn();
    api.addMapListDataFromOnlineSource = () => fakeErrorResponse;

    // action
    await asyncAddMapListFromOnlineSourceActionCreator({
      name: 'Papua Barat', title: 'Papua Barat', type: 'WMS', url: 'https://basemap.nationalmap.gov/arcgis/services/USGSTNMBlank/MapServer/WMSServer?request=GetCapabilities&service=WMS',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(fetchDataFailedActionCreator(fakeErrorResponse.message));
  });
  it('Should dispatch correctly when add map list data from online source is succeed', async () => {
    // arrange
    const fakeSuccessResponse = {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      url: 'https://basemap.nationalmap.gov/arcgis/services/USGSTNMBlank/MapServer/WMSServer?request=GetCapabilities&service=WMS',
    };
    const dispatch = jest.fn();
    api.addMapListDataFromOnlineSource = () => fakeSuccessResponse;
    // action
    await asyncAddMapListFromOnlineSourceActionCreator({
      name: 'Papua Barat', title: 'Papua Barat', type: 'WMS', url: 'https://basemap.nationalmap.gov/arcgis/services/USGSTNMBlank/MapServer/WMSServer?request=GetCapabilities&service=WMS',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(modalAddSuccessToggleActionCreator(true));
  });
});
