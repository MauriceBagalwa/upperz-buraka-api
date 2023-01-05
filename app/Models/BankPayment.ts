import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import generate from 'App/Utils/Generator'

export default class BankPayment extends BaseModel {

  @column({ isPrimary: true })
  public id: string

  @column()
  public paymentId: string

  @column()
  public bank_account_id: string

  @column()
  public transaction_id: string

  @column({ serializeAs: 'save_by' })
  public userId: string

  @column()
  public currency: string

  @column()
  public payment_date: Date

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async generateId(model: BankPayment) {
    model.id = await generate.id()
  }

}
