import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import "./Global.css";
import "./Sidebar.css";
import "./App.css";
import "./Main.css";
import Notes from "./Components/Notes/index.js";
import api from "./Services/Api.js";

function App() {
  const [title, setTitles] = useState("");
  const [notes, setNotes] = useState("");
  const [allNotes, setAllNotes] = useState([]);

  useEffect(() => {
    getAllNotes();
  }, []);

  async function getAllNotes() {
    const response = await api.get("/annotations");
    setAllNotes(response.data);
  } // não precisa mexer, função básica de get de todas as annotations presentes no banco

  async function handleDelete(id) { // função de exclusão da nota do banco de dados, método delete
    const deletedNote = await api.delete(`/annotations/${id}`); // vai buscar o ID cadastrado junto a action para verificar no banco

    if (deletedNote) {
      setAllNotes(allNotes.filter((note) => note._id != id)); // verifica os ids cadastrados e se for diferente do id passado para
      //exclusão, será mantido, caso contrário será removido
    }
  }

  /*async function handleChangePriority(id) {
    const note = await api.put(`/priorities/${id}`);
    if (note) {
      getAllNotes();
    }
  }*/ // mudança de prioridade nao é mais necessária

  async function handleSubmit(e) { // submissão da action
                                   // verificar quais campos são obrigatórios ou não para o cadastramento efetivo da action 
    e.preventDefault();

    const response = await api.post("/annotations", {
      title,
      notes,
      priority: false,
    });

    setTitles("");
    setNotes("");
    setAllNotes([...allNotes, response.data]);
  }
  // useEffect(() => {
  //   function enableSubmitButton() {
  //     let btn = document.getElementById("btn_submit");
  //     btn.style.background = "#115508";
  //     if (title && notes) {
  //       btn.style.background = "#175a03";
  //     }
  //   }
  //   enableSubmitButton();
  // }, [title, notes]);

  return (
    <>
      <header className="header">
        <img className="img" src="/logoOI.png" alt="logo oi" />
      </header>

      <div id="app">
        <aside>
          <strong>Cadastro de actions</strong>
          <form onSubmit={handleSubmit}>
            <div className="input-block">
              <label htmlFor="nameAction">Nome da Action!</label>
              <input type="text" id="buscaDeCampo" className="campo"/>

              <label htmlFor="nota">Action</label>
              <textarea
                required
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="title">Escolha o metodo de envio!</label>

              <div className="buttons">
                <button  
                // onClick={e =>handleSave(e.target,data.notes)}
                className="button-post"
                >
                  
                  POST DE CADASTRO
                </button>
                <button  className="button-get">
                  GET
                </button>
                <button  className="button-delete">
                  DELETE
                </button>
                <button  className="button-put">
                  POST DE MENSAGEM
                </button>
              </div>
            </div>
            
            {/* <button id="btn_submit" type="submit">
              Salvar
            </button> */}
          </form>
        </aside>
        <main>
          <ul>
            {allNotes.map((data) => (
              <Notes
                data={data}
                handleDelete={handleDelete}
                // handleChangePriority={handleChangePriority}
              />
            ))}
          </ul>
        </main>
      </div>
    </>
  );
}

export default App;
