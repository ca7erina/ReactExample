import { v4 } from 'node-uuid';

const fakeDatabase = {
  todos: [
    {
      id: v4(),
      text: 'hello',
      completed: true,
    },
    {
      id: v4(),
      text: 'hey',
      completed: false,
    },
    {
      id: v4(),
      text: 'Ni hao',
      completed: true,
    },
  ],

};

const delay = ms =>
  new Promise(resolve => setTimeout(resolve, ms));


const fetchTodos = filter =>
  delay(500).then(() => {
    switch (filter) {
      case 'all':
        return fakeDatabase.todos;
      case 'active':
        return fakeDatabase.todos.filter(t => !t.completed);
      case 'completed':
        return fakeDatabase.todos.filter(t => t.completed);
      default:
        return new Error(`Unknown filter: ${filter}`);
    }
  });


export default fetchTodos;
