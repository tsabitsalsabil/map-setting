import ACTION_TYPE from './mapListActionType';

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

export const addMapListActionCreator = ({ no, map, source }) => ({
  type: ACTION_TYPE.addMapListType,
  payload: {
    no,
    map,
    fileSource: source,
  },
});
