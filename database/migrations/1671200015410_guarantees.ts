import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'guarantees'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable()
      table.uuid('users_id').references('users.id').notNullable().onDelete('CASCADE')
      table.uuid('rental_location_id').references('rental_locations.id').notNullable().onDelete('CASCADE')
      table.integer('month').notNullable()
      table.float('amount').notNullable()
      table.string('currency', 4).defaultTo('USD')

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
