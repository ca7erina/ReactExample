import { v4 } from 'node-uuid';
import * as apis from '../api';

export const addTodo = text => ({
  type: 'ADD_TODO',
  id: v4(),
  text,
});

const requestTodos = filter => ({
  type: 'REQUEST_TODOS',
  filter,
});

const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response,
});

export const fetchTodos = filter => (dispatch) => {
  dispatch(requestTodos(filter));
  return apis.fetchTodos(filter).then(response => dispatch(receiveTodos(filter, response)));
};

// export const setVisibilityFilter = filter => ({
//   type: 'SET_VISIBILITY_FILTER',
//   filter,
// });

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id,
});
