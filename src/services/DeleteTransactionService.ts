import { getCustomRepository } from 'typeorm'
import AppError from '../errors/AppError'
import TransactionsRepository from '../repositories/TransactionsRepository'

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepositiry = getCustomRepository(TransactionsRepository)
    const transaction = await transactionsRepositiry.findOne(id)

    if (!transaction) {
      throw new AppError('Transaction does not exist')
    }

    await transactionsRepositiry.delete(id)
  }
}

export default DeleteTransactionService
