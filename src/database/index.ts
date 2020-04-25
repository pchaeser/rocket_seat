import { createConnection, getConnectionOptions, Connection } from 'typeorm'

export default async (name = 'default'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions()
  const port = process.env.NODE_ENV === 'test' ? 5557 : 5556
  const database =
    process.env.NODE_ENV === 'test'
      ? 'gostack_desafio06_tests'
      : defaultOptions.database

  return createConnection(
    Object.assign(defaultOptions, {
      name,
      database,
      port
    })
  )
}
