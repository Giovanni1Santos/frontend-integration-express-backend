import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await api.get('/todos');
      setTodos(response.data);
    } catch (error) {
      toast.error('Erro ao carregar tarefas');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    toast.success('Logout realizado com sucesso!');
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="dashboard-container">
      <button onClick={handleLogout} className="logout-btn">
        Sair
      </button>
      <h2>Minhas Tarefas</h2>
      <TodoForm onTodoAdded={fetchTodos} />
      <div className="todos-list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onUpdate={fetchTodos} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;