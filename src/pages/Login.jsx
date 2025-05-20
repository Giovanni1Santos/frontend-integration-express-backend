import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)
        navigate('/dashboard')
      } else {
        alert(data.message || 'Erro ao fazer login')
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro na conexão com o servidor')
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        Não tem uma conta? <Link to="/register">Cadastre-se</Link>
      </p>
    </div>
  )
}

export default Login
