import api from '../../api/api';
import ACTION_TYPE from './mapListActionType';
import {
  modalAddSuccessToggleActionCreator,
  modalDeleteSuccessToggleActionCreator,
} from '../Modal/modalActionCreator';

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

export const searchMapListActionCreator = (keyword) => ({
  type: ACTION_TYPE.searchMapListType,
  payload: {
    keyword,
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
  const data = await api.fetchMapListData();
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
