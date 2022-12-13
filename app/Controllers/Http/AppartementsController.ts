import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AppartementValidator from "App/Validators/AppartementValidator"
import Service from "App/Services/Appartement.service"
import Type from "App/Services/Typebien.service"
import { inject } from "@adonisjs/fold";
import Logger from '@ioc:Adonis/Core/Logger';
import { EBienType } from 'App/Models/TypeBien';

@inject()
export default class AppartementsController extends AppartementValidator {
      constructor(public appartment: Service, private type: Type) {
            super()
      }

      public async index({ request, response }: HttpContextContract) {
            try {
                  const { page = 1, limit = 100, orderBy = "created_at", typeAppartement, typeBien, status } = request.qs()
                  const data = await this.appartment.findAll({ page, limit, orderBy, typeAppartement, typeBien, status })
                  response.ok({ status: true, data })
            } catch (error) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }

      public async show({ request, response }: HttpContextContract) {
            //1
            const { id } = await request.validate({ schema: this.v_id_param, data: { id: request.param('id') } })
            try {
                  //2
                  const appartFind = await this.appartment.find({ key: 'id', value: id })
                  if (!appartFind)
                        return response.notFound({ status: false, message: 'Appartement no found.' })
                  //3
                  response.ok({ status: true, data: appartFind })
            } catch (error) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }

      public async store({ request, response }: HttpContextContract) {
            //1
            const payload = await request.validate({ schema: this.v_create })
            try {
                  //2
                  const typeAppart = await this.type.findAppartType({ key: 'id', value: payload.typeAppartementId })
                  if (typeAppart?.designation === EBienType.APPARTEMENT && !payload.number)
                        return response.notAcceptable({ status: false, message: 'Appartement number is required' })
                  else
                        payload.number = 0
                  //3
                  const data = await this.appartment.registre(payload)
                  response.created({ status: true, data })
            } catch (error) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }

      public async update({ request, response }: HttpContextContract) {
            //1
            const { id } = await request.validate({ schema: this.v_id_param, data: { id: request.param('id') } })
            const payload = await request.validate({ schema: this.v_create })
            try {
                  //2
                  const appartFind = await this.appartment.find({ key: 'id', value: id })
                  if (!appartFind)
                        return response.notFound({ status: false, message: 'Appartement no found.' })
                  //3
                  const typeAppart = await this.type.findBienType({ key: 'id', value: payload.typeBienId })
                  if (typeAppart?.designation === EBienType.APPARTEMENT && !payload.number)
                        return response.notAcceptable({ status: false, message: 'Appartement number is required' })

                  else
                        payload.number = 0
                  //4
                  const data = await this.appartment.update(id, payload)
                  response.created({ status: true, data })
            } catch (error) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }

      public async destroy({ request, response }: HttpContextContract) {
            //1
            const { id } = await request.validate({
                  schema: this.v_id_param,
                  data: { id: request.param('id') }
            })
            try {
                  //2
                  const appartFind = await this.appartment.find({ key: 'id', value: id })
                  if (!appartFind)
                        return response.notFound({ status: false, message: 'Appartement no found.' })
                  //3
                  await this.appartment.destroy(id)
                  response.created({ status: true, message: 'Appartement deleted.' })
            } catch (error) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }

}
