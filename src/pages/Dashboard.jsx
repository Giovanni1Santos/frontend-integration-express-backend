import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  fetchTodos,
  createTodo,
  deleteTodo,
  toggleTodoDone
} from '../api/api'

export default function Dashboard() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const navigate = useNavigate()

  const loadTodos = () => {
    fetchTodos()
      .then(setTodos)
      .catch(err => {
        toast.error(err.message)
        if (err.message.includes('token')) {
          localStorage.removeItem('token')
          navigate('/login')
        }
      })
  }

  useEffect(() => {
    loadTodos()
  }, [])

  const handleCreateTodo = async (e) => {
    e.preventDefault()
    try {
      await createTodo(newTodo)
      toast.success('Tarefa criada!')
      setNewTodo('')
      loadTodos()
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Deseja excluir esta tarefa?')) return
    try {
      await deleteTodo(id)
      toast.success('Tarefa removida!')
      loadTodos()
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleToggleDone = async (id, currentDone) => {
    try {
      await toggleTodoDone(id, !currentDone)
      toast.success('Tarefa atualizada!')
      loadTodos()
    } catch (err) {
      toast.error(err.message)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={logout}>Sair</button>

      <form onSubmit={handleCreateTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Nova tarefa"
          required
        />
        <button type="submit">Adicionar</button>
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.done ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
              onClick={() => handleToggleDone(todo.id, todo.done)}
            >
              {todo.title}
            </span>
            <button onClick={() => handleDelete(todo.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
