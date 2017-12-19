import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleTodo } from '../actions';
import { getVisibleTodos } from '../reducers/todoApp';
import TodoList from '../components/TodoList';

const mapStateToProps = (state, props) => ({
  todos: getVisibleTodos(state, props.match.params.filter || 'all'),
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

