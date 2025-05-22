import { useState } from 'react'
import { toast } from 'react-toastify'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Erro no cadastro')
      toast.success('Cadastro realizado com sucesso! Faça login.')
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro</h2>
      <input name="name" placeholder="Nome" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Senha" onChange={handleChange} required />
      <button type="submit">Cadastrar</button>
    </form>
  )
}
