import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories ] = useState([]);

  useEffect( () => {
    api.get('/repositories').then( response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Outro repositório ${ new Date() }`,
      url: "https://github.com/hygor/",
      techs: ["UX Design", "UI Design"]
    });
    const newRepository = response.data;
    setRepositories([...repositories, newRepository]);
  }

  async function handleRemoveRepository(id) {
    const repoIndex = repositories.findIndex( item => item.id === id );
    repositories.splice(repoIndex, 1);
    setRepositories([...repositories]);
    api.delete(`/repositories/${id}`);
  }

  return (
    <div>
      { repositories.length ? (
        <ul data-testid="repository-list">
          { repositories.map( item => (
            <li key={item.id}>
              <span>{ item.title }</span>
              <button onClick={() => handleRemoveRepository(item.id)}>
                Remover
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div data-testid="repository-list"></div>
      )}
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
