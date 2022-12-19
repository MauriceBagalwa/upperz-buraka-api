import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import generate from "App/Utils/Generator"

export default class Guarantee extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public rentalLocationId: string

  @column()
  public month: number

  @column()
  public amount: number

  @column()
  public currency: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(model: Guarantee) {
    model.id = await generate.id()
  }
  
}
