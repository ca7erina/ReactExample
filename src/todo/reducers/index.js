import { combineReducers } from 'redux';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';
// import todo from './todo';

// const allIds = (state = [], action) => {
//   switch (action.type) {
//     case 'ADD_TODO':
//       return [...state, action.id];
//     default:
//       return state;
//   }
// };

const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed'),
});

const todos = combineReducers({
  byId,
  listByFilter,
});

export default todos;

export const getVisibleTodos = (state, filter) => {
  const ids = fromList.getIds(state.listByFilter[filter]);
  return ids.map(id => fromById.getTodo(state.byId, id));
};

export const getIsFetching = (state, filter) =>
  fromList.getIsFetching(state.listByFilter[filter]);

// export const getVisibleTodos = (state, filter) => {
//   const allTodos = getAllTodos(state);
//   switch (filter) {
//     case 'completed':
//       return allTodos.filter(t => t.completed);
//     case 'active':
//       return allTodos.filter(t => !t.completed);
//     case 'all':
//     default:
//       return allTodos;
//   }
// };
