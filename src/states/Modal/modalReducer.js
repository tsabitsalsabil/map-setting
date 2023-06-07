import ACTION_TYPE from './ActionType';

const initialState = {
  isEdit: false,
  isShowModalDelete: false,
  isDeleteSuccess: false,
  isUpdateSuccess: false,
};

const modalReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ACTION_TYPE.changeToggleEditModal:
      return {
        ...state,
        isEdit: action.payload.isShow,
      };
    case ACTION_TYPE.showDeleteModal:
      return {
        ...state,
        isShowModalDelete: action.payload.isShow,
      };
    case ACTION_TYPE.deleteSuccess:
      return {
        ...state,
        isDeleteSuccess: action.payload.isShow,
        isShowModalDelete: false,
      };
    case ACTION_TYPE.editSuccess:
      return {
        ...state,
        isUpdateSuccess: true,
        isEdit: false,
      };
    default:
      return state;
  }
};

export default modalReducer;
