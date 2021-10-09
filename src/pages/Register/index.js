import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
    };

    try {
      // const response = await api.post('ongs', data);
      await api.post('user', data);

      // alert(`Seu ID de acesso: ${response.data.id}`);

      history.push('/');
    } catch (error) {
      alert('Erro no cadastro, tente novamente.');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e organize os churrascos com os amigos.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar à página de login
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input 
            placeholder="Nome"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input 
            type="email" 
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input 
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}