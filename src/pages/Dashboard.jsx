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
    if (!newTodo.trim()) return toast.warn('Digite algo!')
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
    <div className="container">
      <header>
        <h2>Minhas Tarefas</h2>
        <button className="logout-btn" onClick={logout}>Sair</button>
      </header>

      <form className="todo-form" onSubmit={handleCreateTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Nova tarefa"
          required
        />
        <button type="submit">Adicionar</button>
      </form>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.done ? 'done' : ''}>
            <span
              onClick={() => handleToggleDone(todo.id, todo.done)}
              title="Clique para marcar como concluída"
            >
              {todo.title}
            </span>
            <button
              className="delete-btn"
              onClick={() => handleDelete(todo.id)}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
