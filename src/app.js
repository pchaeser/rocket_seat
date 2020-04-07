const cors = require('cors')
const express = require('express')
const { uuid } = require('uuidv4')


const app = express()

app.use(express.json())
app.use(cors())

const repositories = []

app.get('/repositories', (request, response) => {
  response.status(200).json(repositories)
})

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body
  const newRepository = { title, url, techs, id: uuid(), likes: 0 }

  repositories.push(newRepository)
  response.status(201).json(newRepository)
})

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  const repositoryIndex = repositories
    .findIndex(({ id: repositoryId }) => repositoryId == id)

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: `Repository ${id} does not exist!` })
  }

  const repositoryUpdated = {
    ...repositories[repositoryIndex],
    title,
    url,
    techs
  }

  repositories[repositoryIndex] = repositoryUpdated
  return response.status(200).json(repositoryUpdated)
})

app.delete('/repositories/:id', (req, res) => {
  const { id } = req.params

  const repositoryIdx = repositories
    .findIndex(({ id: repId }) => repId == id)

  if (repositoryIdx < 0) {
    return res.status(400).json({ error: `Repository ${id} does not exist!` })
  }


  repositories.splice(repositoryIdx, 1)
  return res.sendStatus(204)
})

app.post('/repositories/:id/like', (request, response) => {
  const { id } = request.params

  const repositoryIndex = repositories
    .findIndex(({ id: repId }) => id == repId)

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: `Repository ${id} does not exist!` })
  }

  const repository = repositories[repositoryIndex]
  repository.likes += 1

  return response.status(200).json(repository)
})

module.exports = app
