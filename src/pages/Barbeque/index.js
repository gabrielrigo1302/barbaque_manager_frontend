import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Profile() {
  const [barbeques, setBarbeques] = useState([]);

  const history = useHistory();

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    api.get(`barbeque/${userId}`).then(response => {
      setBarbeques(response.data.barbeque);
    })
  }, [userId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`barbeque/${id}`);
      // const response = await api.get(`person/${id}`)

      // response.people.map(async(person) => {
      //   await api.delete(`person/${person.id}`);
      // })

      setBarbeques(barbeques.filter(incident => incident.id !== id));
    } catch (err) {
      
      console.log("error === ", err)
      alert('Erro ao deletar, tente novamente.');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <Link className="button" to="/barbeques/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {barbeques.map(barbeque => (
          <li key={barbeque.id}>
            <p>{barbeque.date}</p>
            <p>{barbeque.reason}</p>
            <p>{barbeque.peopleQuantity}</p>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(barbeque.coust)}</p>

            <button onClick={() => handleDeleteIncident(barbeque.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}