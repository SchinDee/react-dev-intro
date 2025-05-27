import { Header } from "./components/header"
import { TodosSection } from "./components/todos/todo-section"
import { TodosProviders } from "./providers/todos-providers"

function App() {
  return (
    <>
    <TodosProviders>

      <div className="container">
        <Header title="My Todo List" subtitle="Add your tasks" />
        <TodosSection />
        <footer>
          <p>Click on a task to mark it as completed</p>
        </footer>
      </div>
          </TodosProviders>

    </>
  )
}

export default App
