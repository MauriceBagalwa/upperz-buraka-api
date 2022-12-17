import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { TID } from "App/Models/Personne"
import GeneralCaseValidator from './GeneralCaseValidator'

export default class PersonneValidator extends GeneralCaseValidator {

  public v_create = schema.create({
    name: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(30)]),
    lastname: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(30)]),
    email: schema.string({ trim: true }, [rules.email()]),
    cardType: schema.enum(Object.values(TID)),
    cardTypeId: schema.string([rules.unique({ table: 'personnes', column: 'card_type_id' })]),
  })

  public v_update = schema.create({
    name: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(30)]),
    lastname: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(30)]),
    email: schema.string({ trim: true }, [rules.email()]),
    cardType: schema.enum(Object.values(TID)),
    cardTypeId: schema.string(),
  })

  public v_phones = schema.create({
    phones: schema.array([rules.minLength(1), rules.maxLength(3)]).members(
      schema.object().members({
        country_code: schema.string([rules.regex(/^(\+?\d{1,3}|\d{1,4})$/)]),
        number: schema.string([rules.maxLength(10)]),
        personne_id: schema.string.optional(),
      })
    )
  })
  public v_phone = schema.create({
    country_code: schema.string([rules.regex(/^(\+?\d{1,3}|\d{1,4})$/)]),
    number: schema.string([rules.maxLength(10)]),
    personne_id: schema.string.optional(),

  })

}
