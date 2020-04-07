import React, { useState, useEffect } from 'react'
import api from './services/api'

import './styles.css'

function App() {
  const [repos, setRepos] = useState([])

  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    try {
      const { data } = await api.get('repositories')
      setRepos(data)
    } catch (err) {
      console.error(err)
    }
  }

  async function handleAddRepository() {
    try {
      const { data: newRepo } = await api.post('repositories', {
        title: `From client: ${new Date()}`,
        url: 'https://...url',
        techs: ['Hello', 'from', 'React']
      })

      setRepos(prevRepos => [...prevRepos, newRepo])
    } catch (err) {
      console.error(err)
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`)
      const index = repos.findIndex(({ id: repoId }) => repoId == id)
      setRepos([...repos.slice(0, index), ...repos.slice(index + 1)])
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repos.map(({ id, title }) => (
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  )
}

export default App
