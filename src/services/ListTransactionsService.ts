import TransactionsRepository from '../repositories/TransactionsRepository'
import { IListTransactions } from '../types/transactions.types'

class ListTransactionsService {
  private transactionsRepository: TransactionsRepository

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository
  }

  public execute(): IListTransactions {
    return {
      transactions: this.transactionsRepository.all(),
      balance: this.transactionsRepository.getBalance()
    }
  }
}

export default ListTransactionsService
