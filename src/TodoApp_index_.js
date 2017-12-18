import { Provider } from 'react-redux';
import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './todo/components/App';
import todoApp from './todo/reducers/todoApp';

import registerServiceWorker from './registerServiceWorker';

const store = createStore(todoApp);
ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
export default App;

