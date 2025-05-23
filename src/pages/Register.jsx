import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../styles/form.css'  // <-- Importa o mesmo CSS

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Erro no cadastro')

      toast.success('Cadastro realizado com sucesso! Redirecionando para login...')
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div className="form-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  )
}
