import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
// import { Route, BrowserRouter } from 'react-router';
import {
  BrowserRouter as Router,
  Route } from 'react-router-dom';
import App from './App';


const Root = ({ store }) => (
  <Provider store={store} >
    <Router>
      <Route path="/:filter?" component={App} />
    </Router>
  </Provider>
);
Root.prototype = {
  store: PropTypes.object.isRequired,
};

export default Root;

