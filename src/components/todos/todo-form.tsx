import { useState, type ChangeEvent } from 'react'
import { useTodoCreate } from '../../hooks/useTodoCreate'
// import { useTodoContext } from "../../hooks/useTodosContext"

export const TodoForm = () => {
  const [todoName, setTodoName] = useState('')

  const { mutate } = useTodoCreate()

  const handelInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('Input change:', e.target.value)
    setTodoName(e.target.value)
  }

  const handleSubmit = () => {
    console.log('Form submitted with todo:', todoName)
    mutate(todoName)
  }

  return (
    <div className="input-group">
      <input
        value={todoName}
        onChange={handelInputChange}
        name="todo-text"
        id="new-todo-input"
        placeholder="What needs to be done?"
      />
      <button onClick={handleSubmit} type="submit" id="add-btn">
        Add
      </button>
    </div>
  )
}
