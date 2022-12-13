import { schema, rules } from '@ioc:Adonis/Core/Validator'
import GeneralCaseValidator from './GeneralCaseValidator'

export default class AppartementValidator extends GeneralCaseValidator {

  public v_create = schema.create({
    typeBienId: schema.string({ trim: true }, [rules.exists({ table: 'type_biens', column: 'id' })]),
    typeAppartementId: schema.string({ trim: true }, [rules.exists({ table: 'type_appartements', column: 'id' })]),
    description: schema.string({ trim: true }, [rules.minLength(8), rules.maxLength(250)]),
    features: schema.string({ trim: true }, [rules.minLength(8), rules.maxLength(250)]),
    address: schema.string({ trim: true }, [rules.minLength(7), rules.maxLength(250)]),
    number: schema.number.optional([rules.range(1, 100)]),
  })

}
