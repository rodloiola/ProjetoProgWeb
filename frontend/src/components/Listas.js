import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tarefas from './Tarefas';

function Listas() {
  const [listas, setListas] = useState([]);
  const [novaLista, setNovaLista] = useState('');

  useEffect(() => {
    fetchListas();
  }, []);

  const fetchListas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/listas');
      setListas(response.data);
    } catch (error) {
      console.error('Erro ao buscar listas:', error);
    }
  };

  const adicionarLista = async () => {
    if (novaLista.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:3000/api/listas/create', { name: novaLista });
        setListas([...listas, response.data]);
        setNovaLista('');
      } catch (error) {
        console.error('Erro ao adicionar lista:', error);
      }
    }
  };

  const deletarLista = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/listas/${id}`);
      setListas(listas.filter(lista => lista._id !== id));
    } catch (error) {
      console.error('Erro ao deletar lista:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Listas</h1>
      <div className="mb-3">
        <input
          type="text"
          value={novaLista}
          onChange={(e) => setNovaLista(e.target.value)}
          placeholder="Nome da nova lista"
          className="form-control"
        />
        <button onClick={adicionarLista} className="btn btn-primary mt-2">Adicionar Lista</button>
      </div>
      <ul className="list-group">
        {listas.map(lista => (
          <li key={lista._id} className="list-group-item">
            {lista.name}
            <button onClick={() => deletarLista(lista._id)} className="btn btn-danger btn-sm float-end">Deletar</button>
            <Tarefas listaId={lista._id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Listas;
