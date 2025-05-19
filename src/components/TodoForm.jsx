import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

const TodoForm = ({ onTodoAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Título é obrigatório');
      return;
    }

    setLoading(true);
    try {
      await api.post('/todos', { title, description });
      toast.success('Tarefa criada com sucesso!');
      setTitle('');
      setDescription('');
      onTodoAdded();
    } catch (error) {
      toast.error('Erro ao criar tarefa');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Descrição (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Salvando...' : 'Adicionar Tarefa'}
      </button>
    </form>
  );
};

export default TodoForm;