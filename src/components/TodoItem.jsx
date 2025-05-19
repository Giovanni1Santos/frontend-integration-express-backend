import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

const TodoItem = ({ todo, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await api.put(`/todos/${todo.id}`, { title, description });
      toast.success('Tarefa atualizada!');
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      toast.error('Erro ao atualizar tarefa');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Tem certeza que deseja excluir esta tarefa?')) return;
    
    setLoading(true);
    try {
      await api.delete(`/todos/${todo.id}`);
      toast.success('Tarefa excluída!');
      onUpdate();
    } catch (error) {
      toast.error('Erro ao excluir tarefa');
    } finally {
      setLoading(false);
    }
  };

  const toggleDone = async () => {
    try {
      await api.put(`/todos/${todo.id}`, { done: !todo.done });
      onUpdate();
    } catch (error) {
      toast.error('Erro ao atualizar tarefa');
    }
  };

  return (
    <div className={`todo-item ${todo.done ? 'done' : ''}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleUpdate} disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <div className="todo-content">
            <h3 onClick={toggleDone} style={{ cursor: 'pointer' }}>
              {todo.title}
            </h3>
            {todo.description && <p>{todo.description}</p>}
          </div>
          <div className="todo-actions">
            <button onClick={() => setIsEditing(true)}>Editar</button>
            <button onClick={handleDelete} disabled={loading}>
              {loading ? 'Excluindo...' : 'Excluir'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;