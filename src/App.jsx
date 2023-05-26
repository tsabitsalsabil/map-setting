import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';
import BaseMapSettingPage from "./pages/BaseMapSettingPage";
import { Provider } from 'react-redux';
import store from "./states/store";

import "./index.scss";

const App = () => (
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
ReactDOM.render(<App />, document.getElementById("app"));
