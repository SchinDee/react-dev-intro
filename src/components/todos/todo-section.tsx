// import { useEffect, useState } from "react"
import { TodoForm } from './todo-form'
import { TodoItem } from './todo-item'
// import type { Todo } from "../../types"
// import { todoApi } from "../../API/todoApi"
import { Spinner } from '../spinner'
// import { useTodos } from "../../hooks/useTodos"
import { ErrorMessage } from '../error'
// import { useTodoContext } from "../../hooks/useTodosContext"
import { useTodosQuery } from '../../hooks/useTodosQuery'

export const TodosSection = () => {
  const { data: todos, error, isLoading, refetch } = useTodosQuery()

  return (
    <main>
      {error && <ErrorMessage message={error.message} onDismiss={refetch} />}
      <TodoForm />
      <div className="todo-container">
        <ul>
          {todos?.map((todo) => {
            return <TodoItem key={todo.id} todo={todo} />
          })}
        </ul>
        {isLoading && <Spinner />}
      </div>
    </main>
  )
}
