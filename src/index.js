import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import configureStrore from './todo/configureStore';
import Root from './todo/components/Root';

const store = configureStrore();

console.log(store.getState());
ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root'),
);
registerServiceWorker();

