import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleTodo } from '../actions';
import TodoList from '../components/TodoList';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'completed':
      return todos.filter(t => t.completed);
    case 'active':
      return todos.filter(t => !t.completed);
    case 'all':
    default:
      return todos;
  }
};

const mapStateToProps = (state, props) => ({
  todos: getVisibleTodos(state.todos, props.match.params.filter || 'all'),
});

// const mapDispatchToProps = dispatch => ({
//   onTodoClick: (id) => {
//     dispatch(toggleTodo(id));
//   },
// });

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo },
)(TodoList));

export default VisibleTodoList;

