import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import BaseMapSettingPage from './pages/BaseMapSettingPage';
import store from './states/store';

import './index.scss';

function App() {
  console.log(process.env.BE_PORT);
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
const root = createRoot(document.getElementById('app'));
root.render(<App />);
