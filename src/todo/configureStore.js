import throttle from 'lodash/throttle';
import todoApp from './reducers/todoApp';
import { createStore } from 'redux';
import { loadState, saveState } from './localStorage';

const configureStore = () => {
  const persistedState = loadState();
  // const persistedState = [];
  // const persistedState = {
  //   todos: [{
  //     id: '0',
  //     text: 'welcome back!',
  //     completed: false,
  //   }],
  // };
  const store = createStore(todoApp, persistedState);

  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todos,
    });
  }, 1000));

  return store;
};

export default configureStore;
