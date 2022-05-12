
export type TodoStatus =  'active' | 'completed';
export interface Todo {
    id: number;
    task: string;
    status: TodoStatus;
}

export interface NewTodoEntry {
    task: string;
}