import loaderReducer from '../loaderReducer';
import ACTION_TYPE from '../loaderType';

/**
 * test case
 * Should return initial state when given by unknown action creator
 * Should set state to false when givn by set loader to false
 * Should set state to tru when givn by set loader to tru
 */

describe('Loader Reducer', () => {
  it('Should return initial state when given by unknown action creator', () => {
    // arrange
    const initialState = false;
    const actionCreator = {
      type: 'UNKNOWN ACITON TYPE',
      payload: {
        value: false,
      },
    };

    // action
    const nextState = loaderReducer(initialState, actionCreator);

    // assert
    expect(nextState).toEqual(initialState);
  });
  it('Should set state to false when givn by set loader to false', () => {
    // arrange
    const initialState = true;
    const actionCreator = {
      type: ACTION_TYPE.setLoader,
      payload: {
        message: '',
        isLoading: false,
      },
    };
    // action
    const nextState = loaderReducer(initialState, actionCreator);
    // assert
    expect(nextState).toEqual({ ...actionCreator.payload });
  });
  it('Should set state to true when givn by set loader to true', () => {
    // arrange
    const initialState = false;
    const actionCreator = {
      type: ACTION_TYPE.setLoader,
      payload: {
        message: 'Uploading',
        isLoading: true,
      },
    };
    // action
    const nextState = loaderReducer(initialState, actionCreator);
    // assert
    expect(nextState).toEqual({ ...actionCreator.payload });
  });
});
