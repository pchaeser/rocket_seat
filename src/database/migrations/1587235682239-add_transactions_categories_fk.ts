import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm'

export default class addTransactionsCategoriesFk1587235682239
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        name: 'FK_TRANSACTION_CATEGORY'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('transactions', 'FK_TRANSACTION_CATEGORY')
  }
}
