import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import React from 'react';
import * as actions from '../actions';
import { getVisibleTodos } from '../reducers/todoApp';
import TodoList from '../components/TodoList';
import fetchTodos from '../api/fakedb';


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
    const { filter, receiveTodos } = this.props;
    fetchTodos(filter).then(todos =>
      receiveTodos(filter, todos));
  }

  render() {
    const { toggleTodo, ...rest } = this.props;
    return (<TodoList {...rest} onTodoClick={toggleTodo} />);
  }
}

fetchTodos('all').then(todos =>
  console.log(todos));

const mapStateToProps = (state, props) => {
  const filter = (props.match.params.filter || 'all');
  return { todos: getVisibleTodos(state, filter), filter };
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

