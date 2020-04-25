import { getCustomRepository, getRepository, In } from 'typeorm'
import csvParse from 'csv-parse'
import fs from 'fs'
import Category from '../models/Category'
import TransactionsRepository from '../repositories/TransactionsRepository'

interface CSVTransaction {
  title: string
  type: 'income' | 'outcome'
  value: number
  category: string
}

class ImportTransactionsService {
  async execute(filePath: string): Promise<void> {
    const readStream = fs.createReadStream(filePath)
    const parser = csvParse({ delimiter: ',', from_line: 2 })
    const parseCSV = readStream.pipe(parser)

    const transactions: CSVTransaction[] = []
    const categories: string[] = []

    parseCSV.on('data', async line => {
      const [title, type, value, category] = line.map((cell: string) =>
        cell.trim()
      )

      if (!title || !type || !value) {
        return
      }

      if (!categories.includes(category)) {
        categories.push(category)
      }

      transactions.push({ title, type, value, category })
    })

    await new Promise(resolve => parseCSV.on('end', resolve))
    await this.createCategoriesIfNotExist(categories)

    const categoriesRepository = getRepository(Category)
    const transactionsRepository = getCustomRepository(TransactionsRepository)

    const transactionsCategories = await categoriesRepository.find({
      where: { title: In(categories) }
    })

    const createdTransactions = transactionsRepository.create(
      transactions.map(({ title, value, type, category }) => ({
        title,
        value,
        type,
        category: transactionsCategories.find(cat => cat.title === category)
      }))
    )

    await transactionsRepository.save(createdTransactions)
    await fs.promises.unlink(filePath)
  }

  private async createCategoriesIfNotExist(
    categories: string[]
  ): Promise<void> {
    const categoriesRepository = getRepository(Category)
    const existingCategories = (
      await categoriesRepository.find({
        where: { title: In(categories) }
      })
    ).map(({ title }) => title)

    const notExistingCategories: string[] = categories.filter(
      category => !existingCategories.includes(category)
    )

    if (notExistingCategories.length > 0) {
      const newCategories = categoriesRepository.create(
        notExistingCategories.map(title => ({ title }))
      )

      await categoriesRepository.save(newCategories)
    }
  }
}

export default ImportTransactionsService
