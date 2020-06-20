import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repositorio ${Date.now()}`,
      url: 'http://www.globo.com',
      techs: ['Teste', 'Teste1', 'Teste2'] 
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    //await api.delete(`repositories/${id}`);
    //const result =  await api.get('repositories');
    //setRepositories(result.data);

    const index = repositories.findIndex(repository => repository.id === id);

    if (index >= 0) {
      const listaRepository = [...repositories];

      listaRepository.splice(index, 1);

      setRepositories(listaRepository);

      await api.delete(`repositories/${id}`);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => 
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>)
        }
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
