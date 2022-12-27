import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, afterCreate, beforeSave, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import generate from "App/Utils/Generator"
import appartement from 'App/Services/Appartement.service'
import location from 'App/Services/Location.service'
import User from './User'
import Landlord from './Landlord'
import Appartement from './Appartement'

export default class RentalContrat extends BaseModel {

  @column({ isPrimary: true })
  public id: string

  @column({ serializeAs: 'appatement' })
  public appartementId: string

  @column({ serializeAs: 'landlord' })
  public landlordId: string

  @column()
  public amount: number

  @column()
  public currency: string

  @column()
  public current: boolean

  @column()
  public numberOfHabitant: number

  @column()
  public status: boolean

  @column({ serializeAs: 'user' })
  public userId: string

  @column.dateTime({ autoCreate: true })
  public start_date: DateTime

  @column.dateTime()
  public end_date: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(model: RentalContrat) {
    model.id = await generate.id()
  }

  @afterCreate()
  public static async updateStatus(model: RentalContrat) {
    await appartement.Instance.update(model.appartementId, { status: true })

    const month = location.guranteeMoth
    await location.Instance.registreGuarantee({ amount: model.amount, month, rentalContratId: model.id })
  }

  @belongsTo(() => User, {})
  public user: BelongsTo<typeof User>

  @belongsTo(() => Appartement, {})
  public appartement: BelongsTo<typeof Appartement>

  @belongsTo(() => Landlord, {})
  public landlord: BelongsTo<typeof Landlord>
}
