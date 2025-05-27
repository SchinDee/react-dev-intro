import { useEffect, useState } from 'react'
import { todoApi } from '../API/todoApi'
import type { Todo } from '../types'

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTodos = async () => {
    setError(null)
    setIsLoading(true)
    try {
      const data = await todoApi.fetchTodos()
      setTodos(data)
    } catch (error) {
      console.error('Failed to fetch todos: ', error)
      setError('failF')
    } finally {
      setIsLoading(false)
    }
  }

  const addTodo = async (todoName: string) => {
    try {
      setError(null)

      setIsLoading(true)
      const newTodo = await todoApi.createTodo(todoName)

      setTodos((prevTodos) => {
        return [...prevTodos, newTodo]
      })
    } catch (error) {
      console.error(error)
      setError('failA')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteTodo = async (todoId: number) => {
    try {
      setError(null)

      setIsLoading(true)
      await todoApi.deleteTodo(todoId)
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId))
    } catch (error) {
      console.error(error)
      setError('failD')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleTodo = async (todoId: number, completed: boolean) => {
    try {
      setError(null)

      setIsLoading(true)
      const updatedTodo = await todoApi.toggleTodo(todoId, !completed)
      setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === todoId ? updatedTodo : todo)))
    } catch (error) {
      console.error(error)
      setError('failT')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    console.log('use effect called')
    fetchTodos()
  }, [])

  return {
    todos,
    error,
    isLoading,
    addTodo,
    deleteTodo,
    toggleTodo,
    refetch: fetchTodos,
  }
}
