import ACTION_TYPE from '../requestStatusActionType';
import requestStatusReducer from '../requestStatusReducer';

/**
 * test case
 * Should return initial states when given by unknown action type
 * Should change load value to true when given by fetchData action type
 * Should change error value to true and message to error message when
   given by fetchDataFailed action type
 * it Should change error value to false, when given by toggle toggleError
 */

describe('Request Status Reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      error: false,
      message: '',
      load: false,
    };
  });

  it('Should return intiial states when given by unknown action type', () => {
    // arrange
    const actionCreator = {
      type: 'UNKNOWN TYPE',
    };

    // action
    const nextState = requestStatusReducer(initialState, actionCreator);

    // assert
    expect(nextState).toEqual(initialState);
  });
  it('Should change load value to true when given by fetch data action type', () => {
    // arrange
    const actionCreator = {
      type: ACTION_TYPE.fetchData,
    };

    // action
    const nextState = requestStatusReducer(initialState, actionCreator);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      load: true,

    });
  });
  it('Should change error value to true and message to error message when given by fetchDataFailed action type', () => {
    // arrange
    const actionCreator = {
      type: ACTION_TYPE.fetchDataFailed,
      payload: {
        message: 'Gagal mendapatkan data',
      },
    };

    // action
    const nextState = requestStatusReducer(initialState, actionCreator);

    // assert
    expect(nextState).toEqual({
      load: false,
      error: true,
      message: actionCreator.payload.message,
    });
  });
  it('Should change error to false when given by Toggle Eror type', () => {
    const actionCreator = {
      type: ACTION_TYPE.toggleError,
      payload: {
        isShow: false,
      },
    };

    // action
    const nextState = requestStatusReducer(initialState, actionCreator);

    // assert
    expect(nextState).toEqual({ ...initialState, error: false });
  });
});
