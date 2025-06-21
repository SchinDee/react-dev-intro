import { Header } from '../components/header'
import { TodosSection } from '../components/todos/todos-section'

const TodoListPage = () => {
  return (
    <>
      <Header title="My Todo List" subtitle="" />
      <TodosSection />
      <footer>{/* <p>Click on a task to mark it as completed</p> */}</footer>
    </>
  )
}

export default TodoListPage
