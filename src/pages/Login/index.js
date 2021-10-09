import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Logon() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('user/login', { 
        email,
        password
       });

      if (!response.data.userId) {
        alert('E-mail ou senha errados, tente novamente');
        return null;
      }

      localStorage.setItem('userId', response.data.userId);
      history.push('/barbeques');
    } catch (error) {
      alert('Falha no login, tente novamente.');
    }
  }

  return (
    <div className="logon-container">
      <div>
        <section className="form">
          <h1>Agenda de Churras</h1>
          <form onSubmit={handleLogin}>
            <h1>E-mail</h1>
            <input 
              placeholder="e-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <h1>Senha</h1>
            <input 
              placeholder="senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button className="button" type="submit">Entrar</button>
            <Link className="back-link" to="/register">
              <FiLogIn size={16} color="#000" />
              Não tenho cadastro
            </Link>
          </form>
        </section>
      </div>
    </div>
  );
}
