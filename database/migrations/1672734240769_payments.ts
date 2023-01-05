import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { TypePayment } from 'App/Models/Payment'

export default class extends BaseSchema {
  protected tableName = 'payments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {

      table.uuid('id').primary().notNullable()
      table.uuid('recovery_id').unsigned().references('recoveries.id').notNullable().onDelete('CASCADE')
      table.uuid('user_id').unsigned().references('users.id').notNullable().onDelete('CASCADE')
      table.enum('type', Object.values(TypePayment)).notNullable()
      table.string('transaction_id')
      table.float('amount').notNullable()
      table.string('currenty', 4).defaultTo('USD')
      table.boolean('status').defaultTo(false)

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
