import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link } from 'react-router-dom';
import Game from './Game';
import ReduxDemo from './ReactReduxDemo';
import TodoApp from './Todo';
import Grid from './Grid';

const RouterExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/game" >Game</Link></li>
        <li><Link to="/redux" >ReduxDemo</Link></li>
        <li><Link to="/todo" >TodoApp</Link></li>
        <li><Link to="/grid" >Grid</Link></li>
      </ul>

      <hr />
      <Route path="/game" component={Game} />
      <Route path="/redux" component={ReduxDemo} />
      <Route path="/todo" component={TodoApp} />
      <Route path="/grid" component={Grid} />
    </div>
  </Router>
);

export default RouterExample;
