import { BaseModel, BelongsTo, afterSave, beforeSave, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import generate from 'App/Utils/Generator'
import Recovery from './Recovery'
import { DateTime } from 'luxon'
import User from './User'

export enum TypePayment {
  CASH = 'cash',
  BANK = 'bank'
}

export default class Payment extends BaseModel {

  @column({ isPrimary: true })
  public id: string

  @column({ serializeAs: 'created_by' })
  public userId: string

  @column({ serializeAs: 'recovery' })
  public recoveryId: string

  @column()
  public type: TypePayment

  @column()
  public amount: number

  @column()
  public currenty: string

  @column()
  public transaction_id: string

  @column()
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async generateId(model: Payment) {
    model.id = await generate.id()
    if (model.type !== TypePayment.BANK)
      model.status = true
  }

  @afterSave()
  public static async updateRevoryStatus(model: Payment) {

    if (model.type !== TypePayment.BANK)
      model.status = true
  }

  @belongsTo(() => Recovery)
  public recovery: BelongsTo<typeof Recovery>

  @belongsTo(() => User)
  public created_by: BelongsTo<typeof User>

}
