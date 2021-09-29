import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function NewIncident() {
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [peopleQuantity, setPeopleQuantity] = useState('');
  const [coust, setCoust] = useState(0);
  const [people, setPeople] = useState([]);
  const [person, setPerson] = useState('');

  const history = useHistory();
  const userId = localStorage.getItem('userId');

  const handleAddPeople = (e) => {
    e.preventDefault()

    const newPerson = {
      name: person,
      isPaid: false,
      coust: 0
    }
    
    const updatedPeople = [...people, newPerson];

    setPeople(updatedPeople)
    setPeopleQuantity(updatedPeople.length)
  }

  const handleDeletePeople = (e, id) => {
    e.preventDefault()

    let updatedPeople = [...people]
    
    updatedPeople.splice(id, 1)
    
    setPeople(updatedPeople)
    setPeopleQuantity(updatedPeople.length)
  }

  async function handleNewBarbeque(e) {
    e.preventDefault();

    const data = {
      userId,
      date,
      reason,
      peopleQuantity,
      coust
    };

    try {
      await api.post('barbeque', data)
      const response = await api.get(`barbeque/${userId}`)

      const barbeques = response.data.barbeque

      console.log("barbeque === ", barbeques)
      let lastBarbequeId = barbeques[0].id;

      barbeques.map((barbeque, index) => {
        if (index > 0){
          lastBarbequeId = barbeque.id > barbeques[index - 1].id ? barbeque.id : barbeques[index - 1].id;  
        } 
      })

      const coustPerPeople = coust / people.length

      people.map(async (newPerson) => {
        const data = {
          barbequeId: lastBarbequeId,
          name: newPerson,
          willDrink: false,
          isPaid: false,
          coust: coustPerPeople
        }
        
      await api.post('person', data)
    })

      history.push('/barbeques');
    } catch (err) {
      console.log("error === ", err)
      alert('Erro ao cadastrar caso, tente novamente.');
    }
  }

  return (
    <div className="new-incident-container">
      <row className="content">
        <form>
          <row>
          <h1>Cadastrar novo Churrasco</h1>
          </row>
          
          <row>
          <input 
            placeholder="Motivo"
            value={reason}
            onChange={e => setReason(e.target.value)}
          />
          </row>
          
          <row>
            <input 
              placeholder="Data"
              type='date'
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </row>

          <row>
            <input 
              className='input'
              placeholder="Preço"
              value={coust}
              onChange={e => setCoust(e.target.value)}
            />
          </row>

          <row>
            <input 
              className="person"
              placeholder="Pessoa"
              value={person}
              onChange={e => setPerson(e.target.value)}
            />
            <button className="person" onClick={(e) => {
              handleAddPeople(e)
            }}>Cadastrar</button>
          </row>

          <row>
            <button className="button" type="submit" onClick={handleNewBarbeque}>Cadastrar</button>
          </row>

          <row>
          <h1>Lista de Pessoas</h1>
          </row>

          <ul>
            {people.map((person, index) => (
              <row>
                <input 
                  className='input'
                  value={person.name}
                />
                <button onClick={(e) => handleDeletePeople(e, index)} type="button">
                  <FiTrash2 size={20} color="#a8a8b3" />
                </button>
              </row>
            ))}
          </ul>
          
        </form>
      </row> 
    </div>
  )
}