import { Tab } from "@headlessui/react"
import { ReactElement, useCallback, useMemo } from "react"
import useSWR, { useSWRConfig } from "swr"
import Spinner from "./components/Spinner"
import TodoForm from "./components/TodoForm"
import TodoItem from "./components/TodoItem"
import { addTodo, deteleTodo, fetcher, toggleTodoStatus, updateTodo } from "./services/todoServices"
import { Todo } from "./types/types"

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ")
}

function App() {
  const categories = useMemo((): string[] => ["All", "Active", "Completed"], [])
  const { data: todos, error } = useSWR("/api/todos", fetcher)
  const activeTodos = useMemo(
    (): Todo[] | undefined => todos?.filter(({ status }: Todo): boolean => status === "active"),
    [todos],
  )
  const completedTodos = useMemo(
    (): Todo[] | undefined => todos?.filter(({ status }: Todo): boolean => status === "completed"),
    [todos],
  )
  const { mutate } = useSWRConfig()

  const handleSubmit = useCallback(
    (value: string) => {
      if (!todos) return
      const newTodo: Todo = {
        id: todos?.length + 1,
        task: value,
        status: "active",
      }
      const todo = [...todos, newTodo]
      const options = { optimistictodos: todo, rollbackOnError: true }

      mutate("/api/todos", addTodo(newTodo, todos), options)
    },
    [todos],
  )

  const handleDelete = useCallback(
    (id: number) => {
      if (!todos) return
      const todo = todos.filter((todo) => todo.id !== id)
      const options = { optimistictodos: todo, rollbackOnError: true }
      mutate("/api/todos", deteleTodo(id, todos), options)
    },
    [todos],
  )

  const handleStatusToggle = useCallback(
    (id: number): void => {
      if (!todos) return
      const todo = todos.map((todo: Todo): Todo => {
        if (todo.id === id) {
          todo.status = todo.status === "active" ? "completed" : "active"
        }
        return todo
      })
      const options = { optimistictodos: todo, rollbackOnError: true }
      mutate("/api/todos", toggleTodoStatus(id, todos), options)
    },
    [todos],
  )

  const handleTodoUpdate = useCallback(
    (id: number, value: string): void => {
      if (!todos) return
      const todoForUpdate = todos.find((todo: Todo): boolean => todo.id === id)
      if (!todoForUpdate) return
      todoForUpdate.task = value
      const todo = todos.map((todo: Todo): Todo => {
        if (todo.id === id) {
          todo.task = value
        }
        return todo
      })
      const options = { optimistictodos: todo, rollbackOnError: true }
      mutate("/api/todos", updateTodo(todoForUpdate, todos), options)
    },
    [todos],
  )

  return (
    <div className=" flex justify-center w-screen h-screen bg-white text-black">
      <main className="w-full flex flex-col space-y-3 text-center max-w-md">
        <h2 className=" text-4xl font-bold">#Todo</h2>
        {error && <div className=" text-red-400 font-bold text-xl">failed to load</div>}
        {!error && !todos && <Spinner />}

        <Tab.Group>
          <Tab.List className={"flex space-x-3 border-b rounded-xl bg-blue-500 p-1"}>
            {categories.map(
              (category: string): ReactElement => (
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                      "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                      selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white",
                    )
                  }
                  key={category}
                >
                  {category}
                </Tab>
              ),
            )}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <TodoForm onSubmit={handleSubmit} />
              <div className="mt-2 flex flex-col space-y-2">
                {todos &&
                  todos.map((todo: Todo) => (
                    <TodoItem
                      key={todo.id}
                      item={todo}
                      onDelete={handleDelete}
                      onToggleStatus={handleStatusToggle}
                      onEdit={handleTodoUpdate}
                    />
                  ))}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <TodoForm onSubmit={handleSubmit} />
              <div className="mt-2 flex flex-col space-y-2">
                {activeTodos &&
                  activeTodos.map((todo: Todo) => (
                    <TodoItem
                      key={todo.id}
                      item={todo}
                      onDelete={handleDelete}
                      onToggleStatus={handleStatusToggle}
                      onEdit={handleTodoUpdate}
                    />
                  ))}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="mt-2 flex flex-col space-y-2">
                {completedTodos &&
                  completedTodos.map((todo: Todo) => (
                    <TodoItem
                      key={todo.id}
                      item={todo}
                      onDelete={handleDelete}
                      onToggleStatus={handleStatusToggle}
                      onEdit={handleTodoUpdate}
                    />
                  ))}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </main>
    </div>
  )
}

export default App
