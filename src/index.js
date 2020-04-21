import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import './index.css';
import App from './App';
import store from './store';
import * as serviceWorker from './serviceWorker';

const { REACT_APP_CREDENTIALS } = process.env;

axios.defaults.baseURL = 'https://sandbox.2600hz.com:8443/v2';
axios.defaults.headers.common.Authorization = `Basic ${REACT_APP_CREDENTIALS}`;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
