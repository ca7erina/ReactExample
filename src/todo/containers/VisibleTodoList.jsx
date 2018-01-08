import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import React from 'react';
import * as actions from '../actions';
import { getVisibleTodos } from '../reducers/todoApp';
import TodoList from '../components/TodoList';
import { fetchTodos } from '../api';
import getIsFetching from '../reducers';


class VisibleTodoList extends React.Component {
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, requestTodos, fetchTodos } = this.props;
    requestTodos(filter);
    fetchTodos(filter);
  }

  render() {
    const { toggleTodo, todos, isFetching } = this.props;
    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }
    return (
      <TodoList
        todos={todos}
        onTodoClick={toggleTodo}
      />
    );
  }
}

fetchTodos('all').then(todos =>
  console.log(todos));

const mapStateToProps = (state, props) => {
  const filter = (props.match.params.filter || 'all');
  return {
    todos: getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    filter,
  };
};

// const mapDispatchToProps = dispatch => ({
//   onTodoClick: (id) => {
//     dispatch(toggleTodo(id));
//   },
// });

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions,
)(VisibleTodoList));

export default VisibleTodoList;

