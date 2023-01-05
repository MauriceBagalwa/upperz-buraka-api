import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { TypePayment } from 'App/Models/Payment'

export default class PaymentValidator {

  public v_create = schema.create({
    recovery_id: schema.string([rules.uuid(), rules.exists({ table: 'recoveries', column: 'id' })]),
    type: schema.enum(Object.values(TypePayment)),
    amount: schema.number(),
    user_id: schema.string.optional(),
    transaction_id: schema.string.optional([rules.requiredWhen('type', 'in', [TypePayment.BANK]), rules.unique({ table: 'payments', column: 'transaction_id' })])
  })

  public v_id_param = schema.create({
    id: schema.string([rules.uuid(), rules.exists({ table: 'payments', column: 'id' })])
  })

  public v_id = schema.create({
    id: schema.string([rules.uuid(), rules.exists({ table: 'recoveries', column: 'id' })])
  })

  /**
   * B A N K
   */
  public v_bankCreate = schema.create({
    payment_id: schema.string([rules.uuid(), rules.exists({ table: 'payments', column: 'id' })]),
    bank_account_id: schema.string([rules.uuid(), rules.exists({ table: 'bank_accounts', column: 'id' })]),
    transaction_id: schema.string(),
    payment_date: schema.date(),
    user_id: schema.string.optional()
  })

}
