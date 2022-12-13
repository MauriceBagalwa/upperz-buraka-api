import { BaseModel, beforeSave, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ImageAppartement from './ImageAppartement'
import TypeAppartement from './TypeAppartement'
import generate from 'App/Utils/Generator'
import TypeBien from './TypeBien'
import { DateTime } from 'luxon'

export default class Appartement extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column({ serializeAs: 'typeBien' })
  public typeBienId: string

  @column({ serializeAs: 'typeAppartement' })
  public typeAppartementId: string

  @column()
  public number: number

  @column()
  public description: string

  @column()
  public features: string

  @column()
  public address: string

  @column()
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @beforeSave()
  public static async hashPassword(model: Appartement) {
    model.id = await generate.id()
  }

  @hasMany(() => ImageAppartement, {})
  public images: HasMany<typeof ImageAppartement>

  @belongsTo(() => TypeAppartement, {})
  public typeAppartement: BelongsTo<typeof TypeAppartement>

  @belongsTo(() => TypeBien, {})
  public typeBien: BelongsTo<typeof TypeBien>
}
