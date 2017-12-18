import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import { Provider, connect } from 'react-redux';
import {
  createStore,
  combineReducers,
} from 'redux';

// Reducer
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false,
      };
    case 'TOGGLE_TODO':

      if (state.id !== action.id) {
        return state;
      }
      console.log(`${state.id} ${action.id}`);

      return {
        ...state,
        completed: !state.completed,
      };
    default:
      return state;
  }
};
// Reducer
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, // items from the old array
        todo(undefined, action),
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};
// Reducer
const visibilityFilter = (
  state = 'SHOW_ALL',
  action,
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const todoApp = combineReducers({
  todos,
  visibilityFilter,
});

// Actions
let nextTodoId = 0;
const addTodo = text => ({
  type: 'ADD_TODO',
  id: (nextTodoId++).toString(),
  text,
});


const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter,
});

const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id,
});

// presentational component
const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>;
  }

  return (
    <a
      href=""
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};

// presentational component
const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink filter="SHOW_ALL">
      All
    </FilterLink>
    {', '}
    <FilterLink filter="SHOW_ACTIVE">
      Active
    </FilterLink>
    {', '}
    <FilterLink filter="SHOW_COMPLETED">
      Completed
    </FilterLink>
  </p>
);


// presentational component
const Todo = ({
  onClick,
  completed,
  text,
}) => (
  <li
    onClick={onClick}
    style={
        {
          textDecoration: completed ? 'line-through' : 'none',
        }
      }
  >
    {text}
  </li>
);

// presentational component
const TodoList = ({ todos, onTodoClick }) => {
  if (todos === undefined) {
    return (<ul />);
  }

  return (
    <ul > {
          todos.map(todo =>
            (<Todo
              key={
                todo.id
              }
              {...todo
              }
              onClick={
                () => onTodoClick(todo.id)
              }
            />))}
    </ul>);
};


// Container
let AddTodo = ({ dispatch }) => {
  let input;
  return (
    <div>
      <form
        onSubmit={(e) => {
        e.preventDefault();
        if (!input.value.trim()) {
          return;
        }
        dispatch(addTodo(input.value));
        input.value = '';
      }}
      >
        <input
          ref={(node) => {
          input = node;
        }}
        />
        <button type="submit">
        Add Todo
        </button>
      </form>
    </div>
  );
};
AddTodo = connect()(AddTodo);
// AddTodo = connect(
//   state => ({}),
//   dispatch => ({ dispatch }),
// )(AddTodo);

// const AddTodo = (props,{store}) =>{
//   let input;
//    return (
//     <div>
//         <input
//           ref={(node) => {
//             input = node;
//           }}
//         />
//         <button onClick={()=>{
//             store.dispatch(
//               {
//                 type:'ADD_TODO',
//                 id:nextTodoId++,
//                 text: input.value
//               }
//             )
//             input.value='';
//           }}>
//           Add Todo
//         </button>
//     </div>
//   );
// };
// AddTodo.contextTypes = {
//   store: React.PropTypes.object,
// };

// Container
const mapStateToLinkProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter,
});
const mapDispatchToLinkProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setVisibilityFilter(ownProps.filter));
  },
});
const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps,
)(Link);

// class FilterLink extends React.Component {
//   componetDidMount() {
//     const { store } = this.context;
//     this.unsubscribe = store.subscribe(() => this.forceUpdate());
//   }

//   componentWillUnmount() {
//     this.unsubscribe;
//   }

//   render() {
//     const props = this.props;
//     const { store } = this.context;
//     const state = store.getState();
//     return (<Link
// active={
//         props.filter === state.visibilityFilter
//       }
//       onClick={
//           () => {
//             store.dispatch({
//               type: 'SETVISIBILITY_FILTER',
//               filter: props.filter,
//             });
//           }
//         }
//     >{props.children}
//             </Link>);
//   }
// }
// FilterLink.contextTypes = {
//   store: React.PropTypes.object
// };

// Container
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    case 'SHOW_ALL':
    default:
      return todos;
  }
};

const mapStateToVisibleTodoProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter),
});

const mapDispatchToVisibleTodoProps = dispatch => ({
  onTodoClick(id) {
    dispatch(toggleTodo(id));
  },
});

const VisibleTodoList = connect(
  mapStateToVisibleTodoProps,
  mapDispatchToVisibleTodoProps,
)(TodoList);

// class VisibleTodoList extends React.Component {
//   componetDidMount() {
//     const { store } = this.context;
//     this.unsubscribe = store.subscribe(() => this.forceUpdate());
//   }

//   componentWillUnmount() {
//     this.unsubscribe;
//   }

//   render() {
//     const props = this.props;
//     const { store } = this.context;
//     const state = store.getState();

//     return (
//     <TodoList
//       todos={

//         }

//       onTodoClick={

//         }
//     />
//     );
//   }
// }
// VisibleTodoList.contextTypes = {
//   store: React.PropTypes.object
// };

// App
const TodoApp = () => (
  <div >
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);
// pass store explicitly
// const TodoApp = ({store}) => (
//   <div >
//     <AddTodo store={store}/>
//     <VisibleTodoList store={store}/>
//     <Footer store={store}/>
//   </div>
// );

// provide context to its childern
{ /* class Provider extends Component {
  getChildContext(){
    return {
        store:this.props.store,
    };
  }
  render(){
    return this.props.children;
  }
}

Provider.childContextTypes ={
  store:React.PropTypes.object
}; */ }
// pass store implicity by context
const store = createStore(todoApp);
ReactDOM.render(
  <Provider store={store} >
    <TodoApp />
  </Provider>,
  document.getElementById('root'),
);

export default TodoApp;


// test
const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux',
  };

  const stateAfter = [{
    id: 0,
    text: 'Learn Redux',
    completed: false,
  }];

  Object.freeze(stateBefore);
  Object.freeze(action);

  expect(todos(stateBefore, action)).toEqual(stateAfter);
};

const testToggleTodo = () => {
  const stateBefore = [{
    id: 0,
    text: 'Learn Redux',
    completed: false,
  }, {
    id: 1,
    text: 'Shopping',
    completed: false,
  }];
  const action = {
    type: 'TOGGLE_TODO',
    id: 1,
  };
  const stateAfter = [{
    id: 0,
    text: 'Learn Redux',
    completed: false,
  }, {
    id: 1,
    text: 'Shopping',
    completed: true,
  }];
  Object.freeze(stateBefore);
  Object.freeze(action);
  expect(todos(stateBefore, action)).toEqual(stateAfter);
};
testAddTodo();
testToggleTodo();
console.info('All tests passed.');
