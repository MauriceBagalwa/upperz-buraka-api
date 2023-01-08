import BankPayment from 'App/Models/BankPayment'
import Payment from 'App/Models/Payment'
import type i from 'interface'

export default class PaymentService {

      private bank = BankPayment
      private payment = Payment

      public async getAllPayment(param: i.IQuerry): Promise<Payment[]> {
            return this.payment.query()
                  .preload('recovery', (query) => {
                        query.preload('rental_contrat', (query) => {
                              query.select(['id', 'user_id', 'appartement_id', 'landlord_id', 'number_of_habitant', 'amount', 'currency', 'start_date', 'current']).preload('user', (query) => {
                                    query.select(['id', 'name', 'lastname', 'country_code', 'phone_number', 'email', 'profile'])
                              }).preload('landlord', (query) => {
                                    query.select(['id', 'name', 'lastname', 'email', 'profile'])
                              })
                                    .preload('appartement', (query) => {
                                          query.select(['id', 'type_bien_id', 'type_appartement_id', 'number', 'designation', 'description', 'features']).preload("typeBien", (query) => {
                                                query.select(['id', 'designation', 'description'])
                                          }).preload("typeAppartement", (query) => {
                                                query.select(['id', 'designation', 'description'])
                                          })
                                    })
                        })
                  })
                  .preload('created_by', (query) => {
                        query.select(['id', 'name', 'lastname', 'country_code', 'phone_number', 'email', 'profile'])
                  })
                  .orderBy('created_at', 'desc')
                  .paginate(param.page, param.limit)
      }

      public async findPayment(params: i.IFindByKeyValue): Promise<Payment | null> {
            return this.payment.query().where(params.key, params.value)
                  .preload('recovery', (query) => {
                        query.preload('rental_contrat', (query) => {
                              query.select(['id', 'landlord_id', 'amount', 'currency'])
                        })
                  })
                  .first()
      }

      public async registrePayment(input: i.IPayment): Promise<Payment | null> {
            return this.payment.create(input)
      }

      public async updatePayment(id: string, input: Partial<i.IRecoveryStatus>): Promise<Payment | null> {
            return this.payment.query().where('id', id).update(input).first()
      }

      public async deletePayment(id: string): Promise<Payment | null> {
            return this.payment.query().where('id', id).delete().first()
      }

      /**
       * B A N K - P A Y M E N T
       */

      public async getAllBankPayment(param: i.IQuerry): Promise<BankPayment[]> {
            return this.bank.query()
                  .orderBy('created_at', 'desc')
                  .paginate(param.page, param.limit)
      }

      public async findBankPayment(params: i.IFindByKeyValue): Promise<BankPayment | null> {
            return this.bank.findBy(params.key, params.value)
      }

      public async registreBankPayment(input: i.IBankPayment): Promise<BankPayment | null> {
            return this.bank.create(input)
      }

      public async deleteBankPayment(id: string): Promise<BankPayment | null> {
            return this.bank.query().where('id', id).delete().first()
      }

}