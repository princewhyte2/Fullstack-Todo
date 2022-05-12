import axios from 'axios'
import { Todo } from '../types/types'

export const fetcher = (url: string):Promise<Todo[]> => axios.get(url).then(res => res.data)

export const addTodo = async (newTodo: Omit<Todo, 'id'>, todos: Todo[]):Promise<Todo[]> => {
    const { data } = await axios.post("/api/todos", newTodo)
    return  [...todos, data]
}

export const deteleTodo = async (id: number, todos: Todo[]): Promise<Todo[]> => {
    await axios.delete(`/api/todos/${id}`)
    return todos.filter((todo:Todo):boolean => todo.id !== id)
}

export const toggleTodoStatus = async (id: number, todos: Todo[]): Promise<Todo[]> => {
    const { data } = await axios.put(`/api/todos/status/${id}`)
    return todos.map((todo:Todo):Todo => todo.id === id ? data : todo)
}

export const updateTodo = async ( todoForUpdate: Omit<Todo,'status'>, todos: Todo[]): Promise<Todo[]> => {
    const { data } = await axios.put(`/api/todos/${todoForUpdate.id}`, todoForUpdate)
    return todos.map((todo:Todo):Todo => todo.id === todoForUpdate.id ? data : todo)
}
