import { ChangeEvent, useState } from "react"

interface Props {
  onSubmit: (value: string) => void
}
const TodoForm = ({ onSubmit }: Props) => {
  const [value, setValue] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (!value.trim()) return
    onSubmit(value)
    setValue("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex space-x-5 todoForm">
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        value={value}
        className="flex-1 h-14 outline-none border p-4 rounded-xl todoFormInput"
        type={"text"}
        placeholder={"What needs to be done?"}
      />
      <button type="submit" className=" text-white bg-blue-500 w-28 rounded-xl h-14 todoFormButton">
        Add
      </button>
    </form>
  )
}

export default TodoForm
