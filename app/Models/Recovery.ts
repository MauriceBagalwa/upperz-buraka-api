import { BaseModel, BelongsTo, HasMany, beforeSave, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import generate from "App/Utils/Generator"
import RentalContrat from './RentalContrat'
import { DateTime } from 'luxon'
import Payment from './Payment'

export enum RecoveryColors {
  BLUE = "#2D2D2D",
  RED = "#FF0000",
  SEMI_RED = "#FF9999",
}

export default class Recovery extends BaseModel {

  @column({ isPrimary: true })
  public id: string

  @column({ serializeAs: 'rental_contrat' })
  public rentalContratId: string

  @column()
  public labelMonth: string

  @column()
  public labelStr: string

  @column.dateTime()
  public dateRecovery: DateTime

  @column()
  public color: RecoveryColors

  @column()
  public status: Boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(model: Recovery) {
    model.id = await generate.id()
  }

  @belongsTo(() => RentalContrat, {})
  public rental_contrat: BelongsTo<typeof RentalContrat>

  @hasMany(() => Payment, {})
  public payments: HasMany<typeof Payment>

  /**
 * Serialize the `$extras` object as it is
 */
  public serializeExtras() {
    return {
      total: this.$extras.total_payment
    }
  }

}
