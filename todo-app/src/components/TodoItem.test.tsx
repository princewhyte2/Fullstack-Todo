import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import TodoItem from "./TodoItem"
import userEvent from "@testing-library/user-event"
import { Todo } from "../types/types"

describe("TodoItem", () => {
  const user = userEvent.setup()
  test("should render correctly", () => {
    const onDelete = jest.fn()
    const onToggleStatus = jest.fn()
    const onEdit = jest.fn()
    const item: Todo = { id: 1, task: "test", status: "active" }
    render(<TodoItem onToggleStatus={onToggleStatus} onEdit={onEdit} onDelete={onDelete} item={item} />)
    const element = screen.getByText("test")
    expect(element).toBeDefined()
  })
  test("should call onDelete when delete button is clicked", async () => {
    const onDelete = jest.fn()
    const onToggleStatus = jest.fn()
    const onEdit = jest.fn()
    const item: Todo = { id: 1, task: "test", status: "active" }
    const { container } = render(
      <TodoItem onToggleStatus={onToggleStatus} onEdit={onEdit} onDelete={onDelete} item={item} />,
    )
    const button = container.querySelector(".todoItemDeleteButton") as HTMLButtonElement
    await user.click(button)
    expect(onDelete).toHaveBeenCalledTimes(1)
    expect(onDelete).toHaveBeenCalledWith(1)
  })
  test("should call onStatusToggle when status button is clicked", async () => {
    const onDelete = jest.fn()
    const onToggleStatus = jest.fn()
    const onEdit = jest.fn()
    const item: Todo = { id: 1, task: "test", status: "active" }
    const { container } = render(
      <TodoItem onToggleStatus={onToggleStatus} onEdit={onEdit} onDelete={onDelete} item={item} />,
    )
    const button = container.querySelector(".todoItemCheckBox") as HTMLButtonElement
    await user.click(button)
    expect(onToggleStatus).toHaveBeenCalledTimes(1)
    expect(onToggleStatus).toHaveBeenCalledWith(1)
  })
  test("should call onEdit when edit button is clicked", async () => {
    //define functions to be called
    const onDelete = jest.fn()
    const onToggleStatus = jest.fn()
    const onEdit = jest.fn()
    const item: Todo = { id: 1, task: "test", status: "active" }
    //render component
    const { container } = render(
      <TodoItem onToggleStatus={onToggleStatus} onEdit={onEdit} onDelete={onDelete} item={item} />,
    )
    //find edit button and click it this should switch to input field
    const button = container.querySelector(".todoItemEditButton") as HTMLButtonElement
    await userEvent.click(button)
    //check if onEdit was called by checking if input field is rendered
    const input = container.querySelector(".todoItemInput") as HTMLInputElement
    expect(input).toBeDefined()
    //check if save button is rendered as well
    const saveButton = container.querySelector(".todoItemSaveButton") as HTMLButtonElement
    expect(saveButton).toBeDefined()
    //add the test update to the input field
    await userEvent.type(input, "update")
    //click save button
    await userEvent.click(saveButton)
    expect(onEdit).toHaveBeenCalledTimes(1)
    expect(onEdit).toHaveBeenCalledWith(1, "testupdate")
  })
})
