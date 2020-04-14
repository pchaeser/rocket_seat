export interface ICreateTransaction {
  title: string
  value: number
  type: 'income' | 'outcome'
}

export interface ITransaction {
  id: string
  title: string
  value: number
  type: 'income' | 'outcome'
}

export interface IListTransactions {
  transactions: Array<ITransaction>
  balance: IBalance
}

interface IBalance {
  income: number
  outcome: number
  total: number
}
