import React, { useState } from 'react';
import Tarefas from './Tarefas';

function Listas() {
  const [listas, setListas] = useState([]);
  const [novaLista, setNovaLista] = useState('');

  const adicionarLista = () => {
    if (novaLista.trim() !== '') {
      setListas([...listas, novaLista]);
      setNovaLista('');
    }
  };

  return (
    <div>
      <h2>Listas</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          value={novaLista}
          onChange={(e) => setNovaLista(e.target.value)}
          className="form-control"
          placeholder="Nome da nova lista"
        />
        <button onClick={adicionarLista} className="btn btn-primary">Adicionar Lista</button>
      </div>
      {listas.map((lista, index) => (
        <div key={index}>
          <h3>{lista}</h3>
          <Tarefas />
        </div>
      ))}
    </div>
  );
}

export default Listas;
