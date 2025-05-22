import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Dashboard() {
  const [todos, setTodos] = useState([])
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/todos`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(async res => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Erro ao carregar dados')
        setTodos(data)
      })
      .catch(err => {
        toast.error(err.message)
        if (err.message.includes('token')) {
          localStorage.removeItem('token')
          navigate('/login')
        }
      })
  }, [token, navigate])

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div>
      <h2>Área Logada (Dashboard)</h2>
      <button onClick={logout}>Sair</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  )
}