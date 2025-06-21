import type { Todo, TodoToggle } from '../types'
import type { NewTodo } from '../types'

const API_URL = 'https://eli-workshop.vercel.app/api/users/scha28/todos'

export class ApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new ApiError(`Api request failed ${response.status}`)
  }
  const data = await response.json()
  return data
}

export const todoApi = {
  async fetchTodos() {
    const response = await fetch(API_URL)
    return handleResponse<Todo[]>(response)
  },

  async createTodo(newTodo: NewTodo) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    })

    return handleResponse<Todo>(response)
  },

  async deleteTodo(id: number) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return handleResponse(response)
  },
  async toggleTodo({ id, completed }: TodoToggle) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed }),
    })

    return handleResponse<Todo>(response)
  },
  async fetchTodo(id: number) {
    const response = await fetch(`${API_URL}/${id}`)
    return handleResponse<Todo>(response)
  },
}
