import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiEdit } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';

export default function Barbeque() {
  const [barbeques, setBarbeques] = useState([]);

  const history = useHistory();

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      history.push('/');
    }

    api.get(`barbeque/${userId}`).then(response => {
      setBarbeques(response.data.barbeque);
    })
  }, [userId, history]);

  async function handleDeleteBarbeque(id) {
    try {
      await api.delete(`barbeque/${id}`);
      setBarbeques(barbeques.filter(barbeque => barbeque.id !== id));
    } catch (err) {
      alert('Erro ao deletar, tente novamente.');
    }
  }

  async function handleUpdateBarbeque(id) {
    try {
      const barbequeToUpdate = barbeques.filter(barbeque => barbeque.id === id);

      localStorage.setItem('barbeque', JSON.stringify(barbequeToUpdate[0]));
      history.push(`/barbeques/update`);
    } catch (error) {
      alert('Erro ao atualizar, tente novamente.');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="barbeque-container">
      <row className="header">
        <button onClick={() => {history.push('/barbeques/new');}} className="create">
          Cadastrar novo caso
        </button>
        <button onClick={handleLogout} type="button" className="logoff">
          <FiPower size={18} color="#E02041" />
        </button>
      </row>

      <h1>Casos cadastrados</h1>

      <ul>
        {barbeques.map(barbeque => (
          <li key={barbeque.id}>
            <row>
              <p>Motivo: {barbeque.reason}</p>
              <p>Data: {barbeque.date}</p>
              <p>Quantidade de pessoas: {barbeque.peopleQuantity}</p>
              <p>Custo: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(barbeque.coust)}</p>
            </row>
           
            <row>
              <div>
                <button onClick={() => handleDeleteBarbeque(barbeque.id)} type="button">
                  <FiTrash2 size={24} color="#a8a8b3" />
                </button>
              </div>
              <div>
                <button onClick={() => handleUpdateBarbeque(barbeque.id)} type="button">
                  <FiEdit size={20} color="#a8a8b3" />
                </button>
              </div>
            </row>
          </li>
        ))}
      </ul>
    </div>
  );
}