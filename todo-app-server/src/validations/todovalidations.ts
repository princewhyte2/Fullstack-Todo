import { NewTodoEntry } from '../types';


const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseTask = (task: unknown): string => {
  if (!task || !isString(task)) {
    throw new Error('Incorrect or missing task');
  }

  return task;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewTodoEntry = (object:any): NewTodoEntry => {
  const newEntry: NewTodoEntry = {
    task: parseTask(object.task)
  };

  return newEntry;
};

export default toNewTodoEntry;