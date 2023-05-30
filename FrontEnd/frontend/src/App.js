
import React, { useState, useEffect } from 'react';
import Header from './Header';
import './Global.css'
import './Sidebar.css'
import './App.css'
import './Main.css'
import Notes from './Components/Notes/index.js';
import api from './Services/Api.js'
//import RadioButton from './Components/Notes/RadioButton';

// componente: estrutura de dado que retorna algo 


  function App() {
  
  
  const [title, setTitles] = useState('');
  const [notes, setNotes] = useState('');
  const [allNotes, setAllNotes] = useState([]);

  useEffect(()=> {
    getAllNotes()
  }, [])

  async function getAllNotes() {
    const response = await api.get('/annotations', )
    setAllNotes(response.data);

  }

 async function handleDelete(id) 
  {
    const deletedNote = await api.delete(`/annotations/${id}`);
    
    if(deletedNote)
      {
        setAllNotes(allNotes.filter(note => note._id != id)); // verifica os ids cadastrados e se for diferente do id passado para 
        //exclusão, será mantido, caso contrário será removido 
      }
  }

  async function handleChangePriority(id)
  {
    const note = await api.put(`/priorities/${id}`);
    if(note)
    {
      getAllNotes();
    }
  }

  async function handleSubmit(e)
  {
    e.preventDefault();

    const response = await api.post('/annotations', {
      title,
      notes,
      priority:false
    });

    setTitles('');
    setNotes('');
    setAllNotes([...allNotes, response.data])
  }
    useEffect(() => {
      function enableSubmitButton() {
       let btn = document.getElementById('btn_submit')
       btn.style.background = '#FFD3CA'
        if(title && notes) {
          btn.style.background = '#EB8F7A'
       }
      }
      enableSubmitButton()
        }, [title, notes])
  

  return (
    <div id = "app">
      <aside>
        <strong>Caderno de Notas</strong>
        <form onSubmit={handleSubmit}> 
          <div className="input-block">
            <label htmlFor="title">Título da anotação</label>
            <input 
            required
            value={title}
            onChange={e => setTitles(e.target.value)}

            />
          </div>  

          <div className="input-block">
            <label htmlFor="nota">Anotações</label>
            <textarea
            required
            value={notes}
            onChange={e => setNotes(e.target.value)}
            />
          </div>
          <button id='btn_submit' type="submit">Salvar</button>
        </form>
       
      </aside>
      <main>
        <ul>
          {allNotes.map(data => (
          <Notes
           data={data}
           handleDelete = {handleDelete}
           handleChangePriority={handleChangePriority}
          />
        ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
