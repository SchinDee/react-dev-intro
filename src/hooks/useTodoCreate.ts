import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiError, todoApi } from '../api/todoApi'
import type { Todo, NewTodo } from '../types'

export const useTodoCreate = () => {
  const queryClient = useQueryClient()

  return useMutation<
    Todo,
    ApiError,
    NewTodo,
    { previousTodos: Todo[] | undefined }
  >({
    mutationKey: ['createTodo'],
    mutationFn: async (todo: NewTodo) => {
      return await todoApi.createTodo(todo)
    },
    onMutate: async (newTodo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])
      queryClient.setQueryData<Todo[]>(['todos'], (old) => [
        ...(old || []),
        {
          id: Date.now(),
          name: newTodo.name,
          completed: false,
          description: newTodo.description ?? undefined,
          priority: newTodo.priority,
        },
      ])
      return { previousTodos }
    },
    onError: (_err, _variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
