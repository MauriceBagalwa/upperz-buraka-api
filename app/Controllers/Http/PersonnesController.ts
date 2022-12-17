import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PersonneValidator from 'App/Validators/PersonneValidator'
import Service from "App/Services/Personne.service"
import Logger from '@ioc:Adonis/Core/Logger'
import { inject } from '@adonisjs/fold'

@inject()
export default class PersonnesController extends PersonneValidator {
      constructor(private personne: Service) {
            super()
      }

      public async index({ request, response }: HttpContextContract) {
            try {
                  const { page = 1, limit = 100, status = true, orderBy = "created_at" } = request.qs()
                  const data = await this.personne.getAll({ page, limit, status, orderBy })
                  return response.ok({ status: true, data })
            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }

      public async store({ request, response }: HttpContextContract) {
            const prayload = await request.validate({ schema: this.v_create })
            const prayloadPhone = await request.validate({ schema: this.v_phones })
            try {
                  const _personne = await this.personne.create(prayload)
                  let phones: unknown
                  if (_personne) {
                        prayloadPhone.phones.map((value) => {
                              value.personne_id = _personne.id
                        })
                        phones = await this.personne.registrePhone(prayloadPhone.phones)
                  }

                  return response.created({
                        status: true, data: {
                              personne: _personne,
                              phones
                        }
                  })
            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }

      public async update({ request, response }: HttpContextContract) {
            const prayload = await request.validate({ schema: this.v_update })
            const { id } = await request.validate({
                  schema: this.v_delete,
                  data: { id: request.param('id') }
            })
            try {

                  if (!await this.personne.find({ key: 'id', value: id }))
                        return response.notFound({ status: false, message: 'Personne no found.' })

                  const data = await this.personne.update(id, prayload)
                  return response.created({
                        status: true, data
                  })
            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }

      public async destroy({ request, response }: HttpContextContract) {
            const { id } = await request.validate({
                  schema: this.v_delete,
                  data: { id: request.param('id') }
            })
            try {

                  if (!await this.personne.find({ key: 'id', value: id }))
                        return response.notFound({ status: false, message: 'Personne no found.' })

                  await this.personne.delete(id)
                  return response.created({
                        status: true, data: 'personne deleted.'
                  })
            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }

      /**
       * Phones
       */
      public async addPhone({ request, response }: HttpContextContract) {
            const { id } = await request.validate({
                  schema: this.v_delete,
                  data: { id: request.param('id') }
            })

            const prayload = await request.validate({ schema: this.v_phone })
            try {

                  if (!await this.personne.find({ key: 'id', value: id }))
                        return response.notFound({ status: false, message: 'Personne no found.' })

                  prayload.personne_id = id
                  await this.personne.registrePhone([prayload])
                  const data = await this.personne.find({ key: 'id', value: id })
                  return response.created({
                        status: true, data
                  })
            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }

      public async updatePhone({ request, response }: HttpContextContract) {
            const { id } = await request.validate({
                  schema: this.v_delete,
                  data: { id: request.param('id') }
            })

            const prayload = await request.validate({ schema: this.v_phone })
            try {

                  if (!await this.personne.findPhone({ key: 'id', value: id }))
                        return response.notFound({ status: false, message: 'Phone no found.' })

                  await this.personne.updatePhone(id, prayload)
                  return response.created({
                        status: true, message: 'Phone updated.'
                  })
            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }

      public async deletePhone({ request, response }: HttpContextContract) {
            const { id } = await request.validate({
                  schema: this.v_delete,
                  data: { id: request.param('id') }
            })
            try {

                  if (!await this.personne.findPhone({ key: 'id', value: id }))
                        return response.notFound({ status: false, message: 'Phone no found.' })

                  await this.personne.deletePhone(id)
                  return response.created({
                        status: true, message: 'Phone deleted.'
                  })
            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }
}
