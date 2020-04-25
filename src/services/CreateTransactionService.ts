import { getRepository, getCustomRepository } from 'typeorm'
import { TransactionType } from '../@types/transactions.types'

import Transaction from '../models/Transaction'
import TransactionsRepository from '../repositories/TransactionsRepository'
import AppError from '../errors/AppError'
import Category from '../models/Category'

class CreateTransactionService {
  public async execute(data: IRequest): Promise<Transaction> {
    const { title, value, type, category } = data

    this.checkTransactionType(type)
    await this.validateBalance(type, value)

    const transactionCategory = await this.createCategoryIfNotExists(category)
    const transactionsRepository = getCustomRepository(TransactionsRepository)

    const newTransaction = transactionsRepository.create({
      title,
      value,
      type,
      category_id: transactionCategory.id
      // exemplo utilizando category que representa um Model
      // resolvido pelo TypeORM
      // category: transactionCategory
    })

    return await transactionsRepository.save(newTransaction)
  }

  private checkTransactionType(transactionType: string): void {
    if (transactionType !== 'income' && transactionType !== 'outcome') {
      throw new AppError('Type must be either "income" or "outcome"')
    }
  }

  private async validateBalance(
    transactionType: string,
    value: number
  ): Promise<void> {
    const { total } = await getCustomRepository(
      TransactionsRepository
    ).getBalance()

    if (transactionType === 'outcome' && total < value) {
      throw new AppError(`You don't have enough balance`)
    }
  }

  private async createCategoryIfNotExists(
    categoryTitle: string
  ): Promise<Category> {
    const categoriesRepository = getRepository(Category)
    const existingCategory = await categoriesRepository.findOne({
      where: { title: categoryTitle }
    })

    if (existingCategory) return existingCategory

    const newCategory = categoriesRepository.create({ title: categoryTitle })
    return await categoriesRepository.save(newCategory)
  }
}

interface IRequest {
  title: string
  value: number
  type: TransactionType
  category: string
}

export default CreateTransactionService
