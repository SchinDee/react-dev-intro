import { useContext } from 'react'
import { TodosContext } from '../context/todos-context'

export const useTodoContext = () => {
  const context = useContext(TodosContext)

  if (context === undefined) {
    throw new Error('Use Todo Context is undefined')
  }
  return context
}
