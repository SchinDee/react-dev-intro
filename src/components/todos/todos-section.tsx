import { useState } from 'react'
// import { TodoForm } from './todo-form'
import { TodoItem } from './todo-item'
import { Spinner } from '../spinner'
import { ErrorMessage } from '../error-message'
import { useTodosQuery } from '../../hooks/useTodosQuery'
import { Link } from 'react-router-dom'

export const TodosSection = () => {
  const [filterText, setFilterText] = useState('')
  const { data: todos, error, isLoading, refetch } = useTodosQuery()

  const filteredTodos = todos?.filter((todo) =>
    todo.name.toLowerCase().includes(filterText.toLowerCase()),
  )

  const showNothingFound =
    !isLoading &&
    todos &&
    filteredTodos?.length === 0 &&
    filterText.trim() !== ''

  return (
    <main>
      {error && <ErrorMessage message={error.message} onDismiss={refetch} />}

      {/* <TodoForm /> */}

      <div className="filter">
        <input
          type="text"
          placeholder="Filter todos by name..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      <div className="todo-container">
        <ul>
          {filteredTodos?.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>

        {showNothingFound && <p style={{ padding: '1rem' }}>Nothing found.</p>}
        {isLoading && <Spinner />}
      </div>

      <br></br>
      <Link to="/add">
        <button className="back-button"> Add new todo</button>
      </Link>
    </main>
  )
}
