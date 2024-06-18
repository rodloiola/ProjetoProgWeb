import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function Tarefas({ listaId }) {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');

  const fetchTarefas = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/tarefas?lista=${listaId}`);
      setTarefas(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  }, [listaId]);

  useEffect(() => {
    fetchTarefas();
  }, [fetchTarefas]);

  const adicionarTarefa = async () => {
    if (novaTarefa.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:3000/api/tarefas/create', {
          description: novaTarefa,
          lista: listaId,
        });
        setTarefas([...tarefas, response.data]);
        setNovaTarefa('');
      } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
      }
    }
  };

  const deletarTarefa = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/tarefas/${id}`);
      setTarefas(tarefas.filter(tarefa => tarefa._id !== id));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  return (
    <div className="mt-3">
      <h2>Tarefas</h2>
      <div className="mb-3">
        <input
          type="text"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          placeholder="Descrição da nova tarefa"
          className="form-control"
        />
        <button onClick={adicionarTarefa} className="btn btn-primary mt-2">Adicionar Tarefa</button>
      </div>
      <ul className="list-group">
        {tarefas.map(tarefa => (
          <li key={tarefa._id} className="list-group-item">
            {tarefa.description}
            <button onClick={() => deletarTarefa(tarefa._id)} className="btn btn-danger btn-sm float-end">Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tarefas;
