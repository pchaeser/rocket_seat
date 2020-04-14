import Transaction from '../models/Transaction'
import { ICreateTransaction } from '../types/transactions.types'

interface Balance {
  income: number
  outcome: number
  total: number
}

class TransactionsRepository {
  private transactions: Transaction[]

  constructor() {
    this.transactions = []
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    return this.all().reduce(
      (acc, { value, type }) => {
        return type === 'income'
          ? addIncome(acc, value)
          : subtractOutcome(acc, value)
      },
      { income: 0, outcome: 0, total: 0 }
    )
  }

  public create(data: ICreateTransaction): Transaction {
    const transaction = new Transaction(data)
    this.transactions.push(transaction)

    return transaction
  }
}

function addIncome(balance: Balance, value: number): Balance {
  const { income, outcome, total } = balance

  return { income: income + value, outcome, total: total + value }
}

function subtractOutcome(balance: Balance, value: number): Balance {
  const { income, outcome, total } = balance

  return { income, outcome: outcome + value, total: total - value }
}

export default TransactionsRepository
