import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RecoveryService from 'App/Services/Recovery.service'
import Logger from '@ioc:Adonis/Core/Logger'
import { inject } from '@adonisjs/fold'

@inject()
export default class RecoveriesController {

      constructor(private recovery: RecoveryService) {
      }

      public async index({ request, response }: HttpContextContract) {
            try {
                  const { page = 1, limit = 100, status, orderBy = "created_at", rentalContratStatus } = request.qs()

                  const data = await this.recovery.getAll({ page, limit, status, orderBy, rentalContratStatus })

                  return response.ok({ status: true, data })
            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }

      public async leftToPay({ request, response }: HttpContextContract) {
            try {
                  const id = request.param('id')
                  const result = await this.recovery.rest(id)
                  return response.ok({
                        status: true, data: {
                              amount: result?.rental_contrat.amount,
                              lat_to_pay: (result?.rental_contrat?.amount! - result?.$extras.total_payment)
                        }
                  })
            } catch (error: any) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, data: null, message: error.message })
            }
      }


}
