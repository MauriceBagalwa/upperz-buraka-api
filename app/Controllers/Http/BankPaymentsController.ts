import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PaymentValidator from "App/Validators/PaymentValidator";
import PaymentService from 'App/Services/Payment.service';
import Logger from '@ioc:Adonis/Core/Logger';
import { inject } from '@adonisjs/fold';
import { TypePayment } from 'App/Models/Payment';

@inject()
export default class BankPaymentsController extends PaymentValidator {
      constructor(private payment: PaymentService) {
            super()
      }

      public async index({ request, response }: HttpContextContract) {
            try {
                  const { page = 1, limit = 100, orderBy = "created_at", status } = request.qs()
                  const data = await this.payment.getAllBankPayment({ page, limit, orderBy, status })
                  response.ok({ status: true, data })
            } catch (error) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }

      public async store({ request, response, auth }: HttpContextContract) {
            const payload = await request.validate({ schema: this.v_bankCreate })
            try {
                  //2
                  const paymentFound = await this.payment.findPayment({ key: 'id', value: payload.payment_id })

                  if (paymentFound?.type !== TypePayment.BANK || !paymentFound.status)
                        return response.conflict({ status: false, message: 'Payment is not supported.' })

                  payload.user_id = auth.use('user').user?.id
                  const result = await this.payment.registreBankPayment(payload)

                  await this.payment.updatePayment(payload.payment_id, { status: true })
                  response.created({ status: true, data: result })

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
                  if (paymentFound.amount > 0)
                        // await this.recovery.update(paymentFound.recoveryId, { status: false })

                        response.created({
                              status: true, message: 'paymment deleted.'
                        })

            } catch (error) {
                  Logger.error(error.message)
                  return response.expectationFailed({ status: false, message: error.message })
            }
      }
}
