import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Tarefas({ listaId }) {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');

  useEffect(() => {
    fetchTarefas();
  }, []);

  const fetchTarefas = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/tarefas/${listaId}`);
      setTarefas(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  const adicionarTarefa = async () => {
    if (novaTarefa.trim() !== '') {
      try {
        const response = await axios.post(`http://localhost:3000/api/tarefas/create`, { text: novaTarefa, listaId });
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
    <div>
      <h2>Tarefas</h2>
      <div>
        <input
          type="text"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          placeholder="Nome da nova tarefa"
        />
        <button onClick={adicionarTarefa}>Adicionar Tarefa</button>
      </div>
      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa._id}>
            {tarefa.text}
            <button onClick={() => deletarTarefa(tarefa._id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tarefas;
