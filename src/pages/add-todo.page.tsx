import { Header } from '../components/header'
import { TodoForm } from '../components/todos/todo-form'
import { Link } from 'react-router-dom'

export default function AddTodoPage() {
  return (
    <>
      <Header title="Add New Todo" subtitle="Here you can add new Todo" />
      <TodoForm />
      <Link to="/">
        <button className="back-button">Back to Home</button>
      </Link>
      <footer></footer>
    </>
  )
}
