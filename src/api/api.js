const API_URL = import.meta.env.VITE_API_URL

export async function fetchTodos() {
  const token = localStorage.getItem('token')
  const res = await fetch(`${API_URL}/api/todos`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}

export async function createTodo(title) {
  const token = localStorage.getItem('token')
  const res = await fetch(`${API_URL}/api/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}

export async function deleteTodo(id) {
  const token = localStorage.getItem('token')
  const res = await fetch(`${API_URL}/api/todos/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.message)
  }
}

export async function toggleTodoDone(id, done) {
  const token = localStorage.getItem('token')
  const res = await fetch(`${API_URL}/api/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ done })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}
