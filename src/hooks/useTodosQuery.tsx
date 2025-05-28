import { useQuery } from '@tanstack/react-query'
import { todoApi } from '../API/todoApi'

export const useTodosQuery = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: () => {
      return todoApi.fetchTodos()
    },
  })
}
