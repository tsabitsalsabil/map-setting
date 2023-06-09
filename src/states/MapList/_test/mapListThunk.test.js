import api from '../../../api/api';
import mapListReducer from '../mapListReducer';
import { fetchDataActionCreator, fetchDataFailedActionCreator } from '../../requestsStatus/requestStatusActionCreator';
import {
  addMapListActionCreator, asyncAddMapListActionCreator, asyncGetMaplistActionCreator, fetchMapActionCreator, modalAddSuccessToggleActionCreator,
} from '../..';
/**
 * Should dispatch correctly when get data failed
 * Should dispatch correctly when get data is succeed
 * Should dispatch correctly When add map data from local source
 */

describe('Map List Thunk Test', () => {
  beforeEach(() => {
    api._fetchMapListData = api.fetchMapListData;
    api._addMapListData = api.addMapListData;
  });
  afterEach(() => {
    api.fetchMapListData = api._fetchMapListData;
    api.addMapListData = api._addMapListData;

    delete api._fetchMapListData;
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
});
