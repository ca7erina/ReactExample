// import throttle from 'lodash/throttle';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import todoApp from './reducers/todoApp';


// import { loadState, saveState } from './localStorage';

// const logger = (store) => (next) => {
//     if (!console.group) {
//       return next;
//     }
//     return (action) => {
//       console.group(action.type);
//       console.log('%c prev state', 'color :gray', store.getState());
//       console.log('%c action', 'color :blue', action);
//       const returnValue = next(action);
//       console.log('%c next state', 'color :green', store.getState());
//       console.groupEnd(action.type);
//       return returnValue;
//     };
//   };
// const promise = (store) => (next) => {
//     return (action) => {
//       if (typeof action.then === 'function') {
//         return action.then(next);
//       }
//       return next(action);
//     };
//   };

// const wrapDispatchWithMiddlewares = (store, middlewares) =>{
//   middlewares.slice().reverse().forEach( middleware =>
//     store.dispatch = middleware(store)(store.dispatch)
//   );
// };

const thunk = (store) => (next) => (action) =>
  typeof action === 'function' ?
    action(store.dispatch) :
    next(action);

const configureStore = () => {
  // const persistedState = loadState();
  // const store = createStore(todoApp, persistedState);

  const middlewares = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    const loggerMiddleware = createLogger();
    middlewares.push(loggerMiddleware);
  }

  return createStore(
    todoApp,
    applyMiddleware(...middlewares),
  );
};

export default configureStore;
