import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import store from './state/store';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

import { DataProvider } from './context/DataContext';

import setupInterceptors from './state/services/setupInterceptors';
setupInterceptors(store);
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <DataProvider>
        <App />
      </DataProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
