import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { TID } from "App/Models/Personne"

export default class extends BaseSchema {
  protected tableName = 'personnes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable()
      table.string('name', 30)
      table.string('lastname', 30)
      table.string('email', 255).nullable().unique()
      table.string('password', 50)
      table
        .string('profile')
        .defaultTo('https://cdn3.iconfinder.com/data/icons/web-and-networking-4/128/45-512.png')
      table.enum('card_type', Object.values(TID)).notNullable()
      table.string('card_type_id').notNullable().unique()
      table.boolean('status').defaultTo(true)

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
