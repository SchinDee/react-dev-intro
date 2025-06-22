import { useState } from 'react'
import { useTodoCreate } from '../../hooks/useTodoCreate'
import { useNavigate } from 'react-router-dom'
import { ErrorMessage } from '../error-message'

export const TodoForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('') // jako string, pak převedeme
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { mutate } = useTodoCreate()
  const navigate = useNavigate()

  const handleSubmit = () => {
    if (name.trim() === '') {
      setError('Name is required.')
      return
    }

    const newTodo = {
      name: name.trim(),
      description: description.trim() === '' ? null : description.trim(),
      priority: priority === '' ? 1 : Number(priority),
    }

    mutate(newTodo)
    navigate('/')

    setIsLoading(true)
    // mutate(newTodo, {
    //   onSuccess: () => {
    //     navigate('/')
    //   },
    //   onError: (err) => {
    //     setError(err.message || 'Something went wrong.')
    //   },
    // })
  }

  return (
    <div className="todo-form space-y-4">
      {error && (
        <ErrorMessage message={error} onDismiss={() => setError(null)} />
      )}
      <label>Name*</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        name="todo-name"
        placeholder="Groceries"
        className=""
        required
      />
      <label>Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        name="todo-description"
        placeholder="Get milk, eggs, and bread from the supermarket. Check for discounts."
        className=""
        rows={3}
      />
      <label>Priority</label>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        name="todo-priority"
        className=""
      >
        {/* <option value="">Select priority (default: 1)</option> */}
        <option value="1">High (1)</option>
        <option value="2">Medium (2)</option>
        <option value="3">Low (3)</option>
      </select>

      <button
        onClick={handleSubmit}
        type="submit"
        className={`back-button ${isLoading ? 'isLoading' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? 'Adding...' : 'Add'}
      </button>
      <br></br>
      <br></br>
    </div>
  )
}
