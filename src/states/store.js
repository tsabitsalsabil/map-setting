import { configureStore } from '@reduxjs/toolkit';
import mapListReducer from './MapList/mapListReducer';
import modalReducer from './Modal/modalReducer';
import requestStatusReducer from './requestsStatus/requestStatusReducer';
import loaderReducer from './loader/loaderReducer';

const store = configureStore({
  reducer: {
    listMap: mapListReducer,
    modals: modalReducer,
    requestStatus: requestStatusReducer,
    loader: loaderReducer,
  },
});

export default store;
