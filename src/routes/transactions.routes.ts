import { Router } from 'express'
import { getCustomRepository } from 'typeorm'
import multer from 'multer'

import TransactionsRepository from '../repositories/TransactionsRepository'
import CreateTransactionService from '../services/CreateTransactionService'
import DeleteTransactionService from '../services/DeleteTransactionService'
import ImportTransactionsService from '../services/ImportTransactionsService'

import uploadConfig from '../config/upload'

const transactionsRouter = Router()
const upload = multer(uploadConfig)

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository)

  response.json({
    transactions: await transactionsRepository.find(),
    balance: await transactionsRepository.getBalance()
  })
})

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body

  response.json(
    await new CreateTransactionService().execute({
      title,
      value,
      type,
      category
    })
  )
})

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params
  await new DeleteTransactionService().execute(id)
  return response.sendStatus(204)
})

transactionsRouter.post(
  '/import',
  upload.single('file'),
  async (request, response) => {
    await new ImportTransactionsService().execute(request.file.path)
    return response.sendStatus(201)
  }
)

export default transactionsRouter
