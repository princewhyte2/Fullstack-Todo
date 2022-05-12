import React, { ChangeEvent, useCallback, useState } from "react"
import { Edit, Save, Trash } from "react-feather"
import { Todo } from "../types/types"

interface Props {
  item: Todo
  onDelete: (id: number) => void
  onToggleStatus: (id: number) => void
  onEdit: (id: number, value: string) => void
}
const TodoItem = ({ item, onDelete, onToggleStatus, onEdit }: Props) => {
  const { task, status, id } = item
  const [isChecked, setIsChecked] = useState(status === "completed")
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(task)
  const handleDelete = (): void => onDelete(id)
  const handleToggleStatus = (): void => {
    onToggleStatus(id)
    setIsChecked(!isChecked)
  }
  const handleClick = useCallback((): void => {
    if (isChecked) return
    setIsEditing(!isEditing)
  }, [isChecked, isEditing])

  const handleSave = useCallback(
    (e: React.FormEvent): void => {
      e.preventDefault()
      setIsEditing(false)
      if (value?.trim() === task.trim()) return
      onEdit(id, value)
    },
    [task, value],
  )

  return (
    <div className="flex w-full  h-6 space-x-2 items-center justify-between todoItem">
      <div className=" overflow-x-hidden flex flex-1 space-x-2 items-center">
        <input className="todoItemCheckBox" onChange={handleToggleStatus} checked={isChecked} type={"checkbox"} />
        {isChecked || !isEditing ? (
          <p
            title={value}
            className={`px-2 text-left ${isChecked ? "line-through" : ""} w-full truncate todoItemText`}
            onDoubleClick={handleClick}
          >
            {value}
          </p>
        ) : (
          <form className="w-full h-full p-2" onSubmit={handleSave}>
            <input
              className={`px-2 w-full outline-none rounded-md ring-1 todoItemInput`}
              value={value}
              onChange={(e: ChangeEvent<HTMLInputElement>): void => setValue(e.target.value)}
              type="text"
            />
          </form>
        )}
      </div>
      <div className="flex space-x-2 items-center">
        {isEditing
          ? !isChecked && (
              <button className="todoItemSaveButton" onClick={handleSave} title="save">
                <Save size={14} />
              </button>
            )
          : !isChecked && (
              <button className="todoItemEditButton" onClick={handleClick} title="edit">
                <Edit size={14} />
              </button>
            )}
        <button className="todoItemDeleteButton" title="delete" onClick={handleDelete}>
          <Trash size={14} />
        </button>
      </div>
    </div>
  )
}

export default TodoItem
