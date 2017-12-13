import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RouterExample from './Router';
import BasicExample from './ReactRouterExample';


import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<RouterExample />, document.getElementById('root'));
registerServiceWorker();

