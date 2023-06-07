import ACTION_TYPE from './ActionType';

const initialState = {
  isEdit: false,
  isDelete: false,
  isDeleteSuccess: false,
  isUpdateSuccess: false,
  isAddSuccess: false,
};

const modalReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ACTION_TYPE.changeToggleAddModalSuccess:
      return {
        ...state,
        isAddSuccess: action.payload.isShow,
      };
    case ACTION_TYPE.changeToggleDeleteModalSuccess:
      return {
        ...state,
        isDeleteSuccess: action.payload.isShow,
      };
    case ACTION_TYPE.changeToggleEditModalSuccess:
      return {
        ...state,
        isEditSuccess: action.payload.isShow,
      };
    case ACTION_TYPE.showDeleteModal:
      return {
        ...state,
        isDelete: action.payload.isShow,
      };
    case ACTION_TYPE.showEditModal:
      return {
        ...state,
        isEdit: action.payload.isShow,
      };
    default:
      return state;
  }
};

export default modalReducer;
