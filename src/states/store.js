import { configureStore } from '@reduxjs/toolkit';
import mapListReducer from './MapList/mapListReducer';
import modalReducer from './Modal/modalReducer';

const store = configureStore({
  reducer: {
    listMap: mapListReducer,
    modals: modalReducer,
  },
});

export default store;
