import TransactionsRepository from '../repositories/TransactionsRepository'
import Transaction from '../models/Transaction'
import { ICreateTransaction } from '../types/transactions.types'

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository
  }

  public execute(data: ICreateTransaction): Transaction {
    switch (data.type) {
      case 'income':
        return this.transactionsRepository.create(data)
      case 'outcome':
        return this.handleOutcome(data)
      default:
        throw new Error('Unsupported transaction type')
    }
  }

  private handleOutcome(data: ICreateTransaction): Transaction {
    const balance = this.transactionsRepository.getBalance()

    if (balance.total < data.value) {
      throw new Error('Insufficient funds')
    }

    return this.transactionsRepository.create(data)
  }
}

export default CreateTransactionService
