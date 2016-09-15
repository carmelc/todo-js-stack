import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import App from './containers/App/App';

const rootElement = document.getElementById('root');
const store = configureStore();

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  rootElement
);
