import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'bank_payments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {

      table.uuid('id').primary().notNullable()
      table.uuid('payment_id').unsigned().references('payments.id').notNullable().onDelete('CASCADE').unique()
      table.uuid('bank_account_id').unsigned().references('bank_accounts.id').notNullable().onDelete('CASCADE')
      table.uuid('user_id').unsigned().references('users.id').notNullable().onDelete('CASCADE')
      table.string('transaction_id').notNullable().unique()
      table.string('currenty', 4).defaultTo('USD')
      table.date('payment_date').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
