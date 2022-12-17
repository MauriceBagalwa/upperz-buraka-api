import { BaseModel, HasMany, beforeSave, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import generate from "App/Utils/Generator"
import PersonnePhone from './PersonnePhone'

export enum TID {
  VOTERS_CARD = "carte electeur",
  PASSPORT = `passport`,
  PERMIS = `permis`,
}

export default class Personne extends BaseModel {

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public lastname: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public profile: string

  @column()
  public cardType: string

  @column()
  public cardTypeId: string

  @column()
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(model: Personne) {
    model.id = await generate.id()
  }

  @hasMany(() => PersonnePhone, {})
  public phones: HasMany<typeof PersonnePhone>

}
