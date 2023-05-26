import { configureStore } from '@reduxjs/toolkit';
import mapListReducer from './MapList/mapListReducer';

const store = configureStore({
  reducer: {
    listMap: mapListReducer,
  },
});

export default store;
