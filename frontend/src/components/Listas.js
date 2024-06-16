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
      console.log('Listas fetched:', response.data);
      setListas(response.data);
    } catch (error) {
      console.error('Erro ao buscar listas:', error);
    }
  };

  const adicionarLista = async () => {
    console.log('Adicionar Lista clicado:', novaLista);
    if (novaLista.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:3000/api/listas/create', { name: novaLista });
        console.log('Lista adicionada:', response.data);
        setListas([...listas, response.data]);
        setNovaLista('');
      } catch (error) {
        console.error('Erro ao adicionar lista:', error);
      }
    } else {
      console.warn('Nome da nova lista está vazio');
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
    <div>
      <h1>Listas</h1>
      <div>
        <input
          type="text"
          value={novaLista}
          onChange={(e) => setNovaLista(e.target.value)}
          placeholder="Nome da nova lista"
        />
        <button onClick={adicionarLista}>Adicionar Lista</button>
      </div>
      <ul>
        {listas.map(lista => (
          <li key={lista._id}>
            {lista.name}
            <button onClick={() => deletarLista(lista._id)}>Deletar</button>
            <Tarefas listaId={lista._id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Listas;
