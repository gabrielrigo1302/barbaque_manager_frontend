import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css';

export default function NewIncident() {
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [peopleQuantity, setPeopleQuantity] = useState('');
  const [coust, setCoust] = useState('');

  const history = useHistory();

  const userId = localStorage.getItem('userId');

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      userId,
      date,
      reason,
      peopleQuantity,
      coust
    };

    try {
      await api.post('barbeque', data, {})

      history.push('/barbeques');
    } catch (err) {
      alert('Erro ao cadastrar caso, tente novamente.');
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className="back-link" to="/barbeques">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input 
            placeholder="Título do caso"
            value={date}
            onChange={e => setDate(e.target.value)}
          />

          <textarea 
            placeholder="Descrição"
            value={reason}
            onChange={e => setReason(e.target.value)}
          />

          <input 
            placeholder="Valor em reais"
            value={peopleQuantity}
            onChange={e => setPeopleQuantity(e.target.value)}
          />

          <input 
            placeholder="Valor em reais"
            value={coust}
            onChange={e => setCoust(e.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}