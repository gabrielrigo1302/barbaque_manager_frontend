import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function UpdateBarbeque() {
  const history = useHistory();

  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [peopleQuantity, setPeopleQuantity] = useState('');
  const [coust, setCoust] = useState(0);
  const [people, setPeople] = useState([]);
  const [person, setPerson] = useState('');
  const [barbeque,] = useState(JSON.parse(localStorage.getItem('barbeque')));
  const [userId,] = useState(JSON.parse(localStorage.getItem('userId')));

  useEffect(() => {
    if (!userId) {
      history.push('/');
    }
  }, [userId, history]);

  useEffect(() => {
    setDate(barbeque.date)
    setReason(barbeque.reason)
    setCoust(barbeque.coust)
    setPeopleQuantity(barbeque.peopleQuantity)

    api.get(`person/${barbeque.id}`).then(response => {
      setPeople(response.data.person);
    })

  }, [barbeque])

  const handleAddPeople = async(e) => {
    e.preventDefault()
    
    const coustPerPeople = coust / (people.length + 1)
    
    const newPerson = {
      name: person,
      isPaid: false,
      coust: coustPerPeople
    }

    const updatedPeople = [...people, newPerson];

    const data = {
      barbequeId: barbeque.id,
      name: person,
      willDrink: false,
      isPaid: false,
      coust: coustPerPeople
    }

    await api.post('person', data)

    setPeople(updatedPeople);
    setPeopleQuantity(updatedPeople.length);
    setPerson('');
  }

  const handleDeletePeople = async(e, id) => {
    e.preventDefault()

    let allPeople = [...people]
    
    const personToDelete = allPeople.filter((people, index) => id === index)
    
    if (personToDelete[0].id) {
      await api.delete(`person/${personToDelete[0].id}`);
    } 
    
    const personToKeep = allPeople.filter((people, index) => id !== index)
    
    setPeople(personToKeep)
    setPeopleQuantity(personToKeep.length)
  }

  async function handleUpdateBarbeque(e) {
    e.preventDefault();

    const data = {
      date,
      reason,
      peopleQuantity,
      coust
    };

    try {
      await api.put(`barbeque/${barbeque.id}`, data)
      history.push('/barbeques');
    } catch (err) {
      alert('Erro ao cadastrar caso, tente novamente.');
    }
  }

  async function handleUpdatePerson(e, person, index) {
    e.preventDefault();
    const personToUpdate = {...person};
    const peopleToUpdate = [...people];
    personToUpdate.isPaid = !personToUpdate.isPaid
    
    
    try {
      await api.put(`person/${personToUpdate.id}`, personToUpdate);
      peopleToUpdate[index] = personToUpdate;
      setPeople(peopleToUpdate);
    } catch (err) {
      alert('Erro ao cadastrar caso, tente novamente.');
    }
  }

  return (
    <div className="new-incident-container">
      <row className="content">
        <form>
          <row>
          <h1>Atualizar Churrasco</h1>
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
              type='number'
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
          <h1>Lista de Pessoas</h1>
          </row>

          <ul>
            {people.map((person, index) => (
              <row>
                <row className='inputs'>
                  <input 
                    className='input'
                    value={person.name}
                  />
                  <select 
                    className='select'
                    value={!!person.isPaid}
                    onChange={(e) => handleUpdatePerson(e, person, index)}
                  > 
                    <option value={true}> Pago </option>
                    <option value={false}> Não Pago </option>
                  </select>
                  <script>
                      var test = "test";
                      document.getElementById("checkbox").value = true;
                  </script>
                </row>
                <button onClick={(e) => handleDeletePeople(e, index)} type="button">
                  <FiTrash2 size={20} color="#a8a8b3" />
                </button>
              </row>
            ))}
          </ul>
          
          <row>
            <button className="button" type="submit" 
              onClick={handleUpdateBarbeque}
            >
              Atualizar
            </button>
          </row>

        </form>
      </row> 
    </div>
  )
}