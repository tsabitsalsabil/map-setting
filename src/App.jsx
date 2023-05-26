import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import BaseMapSettingPage from './pages/BaseMapSettingPage';
import store from './states/store';

import './index.scss';

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/map-setting/*" element={<BaseMapSettingPage />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
ReactDOM.render(<App />, document.getElementById('app'));
