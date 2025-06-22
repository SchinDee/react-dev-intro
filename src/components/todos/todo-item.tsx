import type { Todo } from '../../types'
import { useTodoDelete } from '../../hooks/useTodoDelete'
import { useTodoToggle } from '../../hooks/useTodoToggle'
import { useNavigate } from 'react-router-dom'

type TodoItemProps = {
  todo: Todo
}
export const TodoItem = ({ todo }: TodoItemProps) => {
  const { mutate: deleteTodo } = useTodoDelete()
  const { mutate: toggleTodo } = useTodoToggle()
  const navigate = useNavigate()

  const handleDeleteTodo = () => {
    deleteTodo(todo.id)
  }

  const handleToggleTodo = () => {
    toggleTodo({ id: todo.id, completed: !todo.completed })
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-main" onClick={() => navigate(`/todos/${todo.id}`)}>
        <span className="todo-name">{todo.name}</span>
        <span className="todo-actions" onClick={(e) => e.stopPropagation()}>
          <button onClick={handleDeleteTodo}>Delete</button>
          <button onClick={handleToggleTodo} className="toggle">
            {todo.completed ? 'Undo' : 'Completed'}
          </button>
        </span>
      </div>
    </li>
  )
}
