import React from 'react';
import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';

const App = (props) => {
  console.log(props.match.params.filter);
  return (<div>
    <AddTodo />
    <VisibleTodoList 
    filter={props.match.params.filter || 'all'} />
    <Footer />
  </div>
);
};

export default App;
