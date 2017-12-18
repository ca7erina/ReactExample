import React from 'react';
import ReactDOM from 'react-dom';


const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};


const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.fliter(l => l !== listener);
    };
  };

  dispatch({});

  return {
    getState,
    dispatch,
    subscribe,
  };
};

const store = createStore(counter);


const render = () => {
  ReactDOM.render(

    < CounterEle />,
    document.getElementById('root'),
  );
};


store.subscribe(render);

class CounterEle extends React.Component {
  constructor() {
    super();
    console.log(store.getState());
    this.state = store.getState();
  }

  decrement() {
    store.dispatch({
      type: 'DECREMENT',
    })
  }

  increment() {
    store.dispatch({
      type: 'INCREMENT',
    })
  }

  render() {
    return (
      <div><h1>{store.getState()}</h1>
        <button onClick={() => this.increment()} >
          +
    </button>
        <button onClick={() => this.decrement()} >
          -
    </button>
      </div>
    );
  }
}


render();

class ReduxDemo extends React.Component {
  render() {
    store.dispatch({
      type: 'INIT',
    });
    return render;
  }
}

export default ReduxDemo;
