import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PaymentValidator from "App/Validators/PaymentValidator";
import RecoveryService from 'App/Services/Recovery.service';
import PaymentService from 'App/Services/Payment.service';
import Logger from '@ioc:Adonis/Core/Logger';
import { inject } from '@adonisjs/fold';
import { TypePayment } from 'App/Models/Payment';
import { RecoveryColors } from 'App/Models/Recovery';
import { remainingDay } from 'App/Utils/String'

@inject()
export default class PaymentsController extends PaymentValidator {
      constructor(private payment: PaymentService, private recovery: RecoveryService) {
            super()
      }

      public async index({ request, response }: HttpContextContract) {
            try {
                  const { page = 1, limit = 100, orderBy = "created_at", status } = request.qs()
                  const data = await this.payment.getAllPayment({ page, limit, orderBy, status })
                  response.ok({ status: true, data })
            } catch (error) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }

      public async store({ request, response, auth }: HttpContextContract) {
            const payload = await request.validate({ schema: this.v_create })
            try {
                  //2
                  const recovery = await this.recovery.find({ key: 'id', value: payload.recovery_id })
                  if (!recovery)
                        return response.notFound({ status: false, message: 'Recovery not found.' })
                  //3
                  const data = await this.recovery.sum(payload.recovery_id)
                  const sum: number = (data?.$extras.total_payment + payload.amount)

                  if (sum > recovery.rental_contrat.amount)
                        return response.notAcceptable({ status: false, message: `La somme des paiments est supperieur à montant du (${recovery.rental_contrat.amount}).` })
                  //4
                  payload.user_id = auth.use('user').user?.id
                  if (payload.type === TypePayment.CASH) { payload.transaction_id = undefined }
                  const result = await this.payment.registrePayment(payload)

                  //5
                  if (sum === recovery.rental_contrat.amount)
                        await this.recovery.update(recovery.id, { status: true, color: RecoveryColors.BLUE })

                  response.created({
                        status: true, data: {
                              payment: result,
                              lat_to_pay: (recovery.rental_contrat.amount - sum)
                        }
                  })

            } catch (error) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }

      public async historical({ request, response }: HttpContextContract) {
            const { id } = await request.validate({
                  schema: this.v_id,
                  data: { id: request.param('id') }
            })
            try {
                  //2
                  const result = await this.recovery.historical(id)
                  if (!result)
                        return response.notFound({ status: false, message: 'Recovery not found.' })
                  response.created({
                        status: true, data: result
                  })

            } catch (error) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }

      public async destroy({ request, response }: HttpContextContract) {

            const payload = await request.validate({
                  schema: this.v_id_param,
                  data: { id: request.param('id') }
            })

            try {
                  //2
                  const paymentFound = await this.payment.findPayment({ key: 'id', value: payload.id })
                  if (!paymentFound)
                        return response.notFound({ status: false, message: 'Payment not found.' })
                  //3
                  await this.payment.deletePayment(paymentFound.id)
                  const day = remainingDay(paymentFound.recovery.dateRecovery)
                  //4
                  if (paymentFound.amount > 0)
                        await this.recovery.update(paymentFound.recoveryId, { status: false, color: (day > 10) ? RecoveryColors.BLUE : (day > 0) ? RecoveryColors.SEMI_RED : RecoveryColors.RED })

                  response.created({
                        status: true, message: 'paymment deleted.'
                  })

            } catch (error) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }
}