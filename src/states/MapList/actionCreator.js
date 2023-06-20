import api from '../../api/api';
import ACTION_TYPE from './mapListActionType';
import {
  modalAddSuccessToggleActionCreator,
  modalDeleteSuccessToggleActionCreator,
  modalEditSuccessToggleActionCreator,
} from '../Modal/modalActionCreator';
import { fetchDataActionCreator, fetchDataFailedActionCreator } from '../requestsStatus/requestStatusActionCreator';
import { toggleLoader } from '../loader/actionCreator';

export const deleteMapListActionCreator = (id) => ({
  type: ACTION_TYPE.deleteMapListType,
  payload: {
    id,
  },
});

export const editMapListActionCreator = ({ id, newData }) => ({
  type: ACTION_TYPE.putMapListType,
  payload: {
    id,
    newData,
  },
});

export const searchMapListActionCreator = (category, query) => ({
  type: ACTION_TYPE.searchMapListType,
  payload: {
    category,
    query,
  },
});

export const addMapListActionCreator = ({ id, map }) => ({
  type: ACTION_TYPE.addMapListType,
  payload: {
    id,
    map,
  },
});

export const fetchMapActionCreator = (data) => (
  {
    type: ACTION_TYPE.getMapListType,
    payload: {
      mapList: data,
    },
  }
);

export const asyncGetMaplistActionCreator = () => async (dispatch) => {
  dispatch(fetchDataActionCreator());
  const data = await api.fetchMapListData();
  if (data.error) {
    dispatch(fetchDataFailedActionCreator(data.message));
    return;
  }
  dispatch(fetchMapActionCreator(data));
};

export const asyncDeleteMapListActionCreator = (id) => async (dispatch) => {
  const test = await api.deleteMapListData(id);
  console.log(test);
  dispatch(deleteMapListActionCreator(id));
  dispatch(modalDeleteSuccessToggleActionCreator(true));
};

export const asyncAddMapListActionCreator = (
  {
    map, uploadedFile, fileType,
  },
) => async (dispatch) => {
  const id = await api.addMapListData({
    map, uploadedFile, fileType,
  });
  dispatch(addMapListActionCreator({ id, map }));
  dispatch(modalAddSuccessToggleActionCreator(true));
};

export const asyncUpdateMapListActionCreator = (id, {
  name,
  title,
  type,
  file,
}) => async (dispatch) => {
  const response = await api.updateMapListData(id, {
    name, title, type, file,
  });
  if (!response.success) {
    dispatch(fetchDataFailedActionCreator(response.message));
    return;
  }
  dispatch(toggleLoader(true));
  dispatch(modalEditSuccessToggleActionCreator(true));
  dispatch(editMapListActionCreator({
    id,
    newData: {
      name: name || title,
      title,
      type,
      file,
    },
  }));
};

export const asyncAddMapListFromOnlineSourceActionCreator = ({
  name, title, type, url,
}) => async (dispatch) => {
  const response = await api.addMapListDataFromOnlineSource({
    name,
    title,
    type,
    url,
  });
  console.log(response);
  if (!response.id) {
    dispatch(fetchDataFailedActionCreator(response.message));
    return;
  }
  dispatch(modalAddSuccessToggleActionCreator(true));
};

export const asyncSearchMap = (category, query) => async (dispatch) => {
  const data = await api.searchMap({ category, query });
  console.log(data);
};
