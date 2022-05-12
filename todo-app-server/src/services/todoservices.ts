import { NewTodoEntry, Todo } from '../types';

const todos:Todo[] = [];

const getEntries = ():Todo[] => {
  return todos;
};

const addTodo = (task: NewTodoEntry):Todo => {
  const todo: Todo = {
    id: todos.length + 1,
    task: task.task,
    status: 'active'
  };
  todos.push(todo);
  return todo;
};

const findById = (id: number): Todo|undefined => {
  const todo = todos.find(todo => todo.id === id);
  return todo;
};

const toggleStatus = (id: number): Todo | undefined => {
  const todo = findById(id);
  if (todo) {
    todo.status = todo.status === 'active' ? 'completed' : 'active';
  }
  return todo;
};

const deleteTodo = (id: number): Todo | undefined => {
  const todo = findById(id);
  if (todo) {
    const index = todos.indexOf(todo);
    todos.splice(index, 1);
  }
  return todo;
};

const updateTodo = (id: number, task: string): Todo | undefined => {
  const todo = findById(id);
  if (todo) {
    todo.task = task;
  }
  return todo;
};




export default {
  getEntries,
  addTodo,
  findById,
  toggleStatus,
  deleteTodo,
  updateTodo
};