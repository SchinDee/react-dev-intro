import { Link, useNavigate } from 'react-router-dom'
import { Header } from '../components/header'
import { useTodoQuery } from '../hooks/useTodoQuery'
import { useTodoDelete } from '../hooks/useTodoDelete'
import { useTodoToggle } from '../hooks/useTodoToggle'

const TodoDetailPage = () => {
  const { data: todo, isError } = useTodoQuery()
  const navigate = useNavigate()

  const { mutate: deleteTodo } = useTodoDelete()
  const { mutate: toggleTodo } = useTodoToggle()

  const handleDelete = () => {
    if (todo) {
      navigate('/')
      deleteTodo(todo.id)
    }
  }

  const handleToggle = () => {
    if (todo) {
      navigate('/')
      toggleTodo({ id: todo.id, completed: !todo.completed })
    }
  }

  if (isError || !todo) {
    return (
      <div className="todo-detail-error">
        <p>Could not load todo item.</p>
        <Link to="/">
          <button className="back-button">Back to Home</button>
        </Link>
      </div>
    )
  }
  return (
    <>
      <Header title="Todo Detail" subtitle="Here is detail of todo" />
      <div className="todo-detail">
        <div className="todo-detail-card">
          <h2>{todo.name}</h2>
          <div className="todo-detail-status">
            Status:{' '}
            <span className={todo.completed ? 'completed' : 'active'}>
              {todo.completed ? 'Completed' : 'Active'}
            </span>
          </div>
          <div className="todo-detail-status">
            Priority: <span className={'completed'}>{todo.priority}</span>
          </div>

          {todo.description && (
            <div className="todo-detail-description">
              <p>{todo.description}</p>
            </div>
          )}
        </div>

        <li className="todo-detail-actions">
          <span>
            <Link to="/">
              <button className="back-button">Back to Home</button>
            </Link>
          </span>

          <button onClick={handleDelete} className="">
            Delete
          </button>
          <button onClick={handleToggle} className="toggle">
            {todo.completed ? 'Mark as Active' : 'Mark as Completed'}
          </button>
        </li>
      </div>
    </>
  )
}

export default TodoDetailPage
