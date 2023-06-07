import ACTION_TYPE from './ActionType';

export const changeToggleModalActionCreator = (actionType, isShow) => ({
  type: actionType,
  payload: {
    isShow,
  },
});

export const modalEditSuccessToggleActionCreator = (value) => changeToggleModalActionCreator(
  ACTION_TYPE.changeToggleEditModalSuccess,
  value,
);

export const modalAddSuccessToggleActionCreator = (value) => changeToggleModalActionCreator(
  ACTION_TYPE.changeToggleAddModalSuccess,
  value,
);

export const modalDeleteSuccessToggleActionCreator = (value) => changeToggleModalActionCreator(
  ACTION_TYPE.changeToggleDeleteModalSuccess,
  value,
);

export const changeEditModalShowActionCreator = (value) => changeToggleModalActionCreator(
  ACTION_TYPE.showEditModal,
  value,
);

export const changeDeleteModalShowActionCreator = (value) => changeToggleModalActionCreator(
  ACTION_TYPE.showDeleteModal,
  value,
);
