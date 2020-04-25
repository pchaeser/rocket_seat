import { EntityRepository, Repository } from 'typeorm'

import Transaction from '../models/Transaction'

interface Balance {
  income: number
  outcome: number
  total: number
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find()

    return transactions.reduce(
      (acc, { value, type }) => {
        return type === 'income'
          ? this.addIncome(acc, Number(value))
          : this.subtractOutcome(acc, Number(value))
      },
      { income: 0, outcome: 0, total: 0 }
    )
  }

  private addIncome(balance: Balance, value: number): Balance {
    const { income, outcome, total } = balance

    return { income: income + value, outcome, total: total + value }
  }

  private subtractOutcome(balance: Balance, value: number): Balance {
    const { income, outcome, total } = balance

    return { income, outcome: outcome + value, total: total - value }
  }
}

export default TransactionsRepository
