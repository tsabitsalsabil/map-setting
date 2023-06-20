import modalReducer from '../modalReducer';
import ACTION_TYPE from '../ActionType';

/**
 * test Case
 * Should return an initial state when given by unknown action typ
 * Should return change isAddSuccess
   value to true/false when given by changeToggleAddModalSuccess type
 * Should change isDeleteSuccess when given by changeToggleDeleteModalSuccess action type to true
 * Should change isDeleteSuccess when given by changeToggleDeleteModalSuccess action type to false
 * Should change isEditSuccess when given by changeToggleEditModalSuccess action type to true
 * Should change isEditSuccess when given by changeToggleEditModalSuccess action type to false
 * Should change is delete value to true when given by showDeleteModal action type to true
 * Should change is delete value to true when given by showDeleteModal action type to false
 * Should change isEdit value to true when given by showEditModal action type to true
 * Should change isEdit value to true when given by showEditModal action type to false
 */

describe('Modal Reducers', () => {
  let initialState;
  beforeAll(() => {
    initialState = {
      isEdit: false,
      isDelete: false,
      isDeleteSuccess: false,
      isUpdateSuccess: false,
      isAddSuccess: false,
    };
  });
  it('Should return initial state when given by unknown action type', () => {
    // arrange
    const actionCreator = {
      type: 'UNKNOWN ACTION TYPE',
    };

    // action
    const nextState = modalReducer(initialState, actionCreator);

    // assert
    expect(nextState).toEqual(initialState);
  });
  it('Should change isAddSuccess value of states, when given by changeToggleAddModalSuccess type', () => {
    // arrange
    const actionCreatorToggleTrue = {
      type: ACTION_TYPE.changeToggleAddModalSuccess,
      payload: {
        isShow: true,
      },
    };
    const actionCreatorToggleFalse = {
      type: ACTION_TYPE.changeToggleAddModalSuccess,
      payload: {
        isShow: false,
      },
    };

    // action
    const nextState = modalReducer(initialState, actionCreatorToggleTrue);
    const nextState2 = modalReducer(initialState, actionCreatorToggleFalse);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      isAddSuccess: actionCreatorToggleTrue.payload.isShow,
    });
    expect(nextState2).toEqual({
      ...initialState,
      isAddSuccess: actionCreatorToggleFalse.payload.isShow,
    });
  });
  it('Should Should change isDeleteSuccess when given by changeToggleDeleteModalSuccess action type to true', () => {
    // arrange
    const actionCreator = {
      type: ACTION_TYPE.changeToggleDeleteModalSuccess,
      payload: {
        isShow: true,
      },
    };

    // action
    const nextState = modalReducer(initialState, actionCreator);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      isDeleteSuccess: actionCreator.payload.isShow,
    });
  });
  it('Should Should change isDeleteSuccess when given by changeToggleDeleteModalSuccess action type to false', () => {
    // arrange
    const actionCreator = {
      type: ACTION_TYPE.changeToggleDeleteModalSuccess,
      payload: {
        isShow: false,
      },
    };

    // action
    const nextState = modalReducer(initialState, actionCreator);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      isDeleteSuccess: actionCreator.payload.isShow,
    });
  });
  it('Should change isEditSuccess when given by changeToggleEditModalSuccess action type to true', () => {
    // arrange
    const actionCreator = {
      type: ACTION_TYPE.changeToggleEditModalSuccess,
      payload: {
        isShow: true,
      },
    };

    // action
    const nextState = modalReducer(initialState, actionCreator);

    // assert
    expect(nextState).toEqual({ ...initialState, isUpdateSuccess: actionCreator.payload.isShow });
  });
  it('Should change isEditSuccess when given by changeToggleEditModalSuccess action type to false', () => {
    // arrange
    const actionCreator = {
      type: ACTION_TYPE.changeToggleEditModalSuccess,
      payload: {
        isShow: false,
      },
    };

    // action
    const nextState = modalReducer(initialState, actionCreator);

    // assert
    expect(nextState).toEqual({ ...initialState, isUpdateSuccess: actionCreator.payload.isShow });
  });
  it('Should change isDelete value to true when given by showDeleteModal action type', () => {
    // arrange
    const actionCreator = {
      type: ACTION_TYPE.showDeleteModal,
      payload: {
        isShow: true,
      },
    };

    // action
    const nextState = modalReducer(initialState, actionCreator);

    // assert
    expect(nextState).toEqual({ ...initialState, isDelete: actionCreator.payload.isShow });
  });
  it('Should change isDelete value to false when given by showDeleteModal action type', () => {
    // arrange
    const actionCreator = {
      type: ACTION_TYPE.showDeleteModal,
      payload: {
        isShow: false,
      },
    };

    // action
    const nextState = modalReducer(initialState, actionCreator);

    // assert
    expect(nextState).toEqual({ ...initialState, isDelete: actionCreator.payload.isShow });
  });
  it('Should change isEdit value to true when given by showEditModal action type to true', () => {
    // arrange
    const actionCreator = {
      type: ACTION_TYPE.showEditModal,
      payload: {
        isShow: true,
      },
    };

    // action
    const nextState = modalReducer(initialState, actionCreator);

    // assert
    expect(nextState).toEqual({ ...initialState, isEdit: actionCreator.payload.isShow });
  });
  it('Should change isEdit value to true when given by showEditModal action type to false', () => {
    // arrange
    const actionCreator = {
      type: ACTION_TYPE.showEditModal,
      payload: {
        isShow: false,
      },
    };

    // action
    const nextState = modalReducer(initialState, actionCreator);

    // assert
    expect(nextState).toEqual({ ...initialState, isEdit: actionCreator.payload.isShow });
  });
});
