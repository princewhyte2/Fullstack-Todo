import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import TodoForm from "./TodoForm"
import userEvent from "@testing-library/user-event"

describe("TodoForm", () => {
  test("should render correctly", () => {
    render(<TodoForm onSubmit={jest.fn()} />)
    const element = screen.getByText("Add")
    expect(element).toBeDefined()
    const placeholder = screen.getByPlaceholderText("What needs to be done?")
    expect(placeholder).toBeDefined()
  })

  test("should call onSubmit when form is submitted", async () => {
    const onSubmit = jest.fn()
    const { container } = render(<TodoForm onSubmit={onSubmit} />)
    const input = container.querySelector(".todoFormInput") as HTMLInputElement
    expect(input).toBeDefined()
    const user = userEvent.setup()
    await user.type(input, "test")
    const button = container.querySelector(".todoFormButton") as HTMLButtonElement
    await user.click(button)

    expect(onSubmit).toHaveBeenCalledTimes(1)

    expect(onSubmit).toHaveBeenCalledWith("test")
  })
})
