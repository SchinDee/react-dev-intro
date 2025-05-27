// import { useEffect, useState } from "react"
import { TodoForm } from "./todo-form"
import { TodoItem } from "./todo-item"
// import type { Todo } from "../../types"
// import { todoApi } from "../../API/todoApi"
import { Spinner } from "../spinner"
// import { useTodos } from "../../hooks/useTodos"
import { ErrorMessage } from "../error"
import { useTodoContext } from "../../hooks/useTodosContext"

export const TodosSection = () => {
  const {isLoading, todos, deleteTodo, toggleTodo, error, refetch} = useTodoContext()
    return (
        <main>
          {error && <ErrorMessage message={error} onDismiss={refetch} />}
          <TodoForm />
          <div className="todo-container">
            <ul id="todo-list" className={isLoading ? "isLoading" : ""}>
              {
                todos.map((todo) => {
                  return <TodoItem key={todo.id} todo= {todo} deleteTodo={deleteTodo} toggleTodo={toggleTodo}/>
                })
              }
              </ul>
              {isLoading && todos.length === 0 && <Spinner/>}
          </div>
        </main>
    )
}