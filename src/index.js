import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from "./App";
import registerServiceWorker from './registerServiceWorker';
import { configureStore } from './Store';


ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById("container")
);
registerServiceWorker();