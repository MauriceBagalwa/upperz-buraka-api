import Recovery from 'App/Models/Recovery'
import type i from 'interface'

export default class RecoveryService {

      private recovery = Recovery
      private static _instance: RecoveryService

      public async find(params: i.IFindByKeyValue): Promise<Recovery | null> {
            return this.recovery.query().where(params.key, params.value!)
                  .preload('rental_contrat', (query) => {
                        query.select(['id', 'user_id', 'appartement_id', 'landlord_id', 'number_of_habitant', 'amount', 'currency', 'start_date', 'current'])
                  })
                  .first()
      }

      public async rest(id: string): Promise<Recovery | null> {
            return await this.recovery.query().select(['id', 'rental_contrat_id']).where('id', id)
                  .preload('rental_contrat', (query) => {
                        query.select(['id', 'amount'])
                  })
                  .withAggregate('payments', (query) => {
                        query.sum('amount').as('total_payment')
                  })
                  .first()
      }
      public async sum(id: string): Promise<Recovery | null> {
            return await this.recovery.query().select(['id']).where('id', id)
                  .withAggregate('payments', (query) => {
                        query.sum('amount').as('total_payment')
                  })
                  .first()
      }

      public async historical(id: string): Promise<Recovery[]> {
            return await this.recovery.query().where('id', id)
                  .preload('rental_contrat', (query) => {
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
                  .preload('payments')
      }

      public async getAll(param: i.IRecoveryQuery): Promise<Recovery[] | null> {
            return await this.recovery
                  .query()
                  .if(param.status, (query) => {
                        query.where('status', param.status!)
                  })
                  .preload('rental_contrat', (query) => {
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
                  .preload('payments')
                  .orderBy('createdAt', 'desc')
                  .paginate(param.page, param.limit)
      }

      public async registre(input: i.IRecovery): Promise<Recovery> {
            return await this.recovery.create(input)
      }

      public async update(id: string, input: object): Promise<Recovery | null> {
            return await this.recovery.query().where('id', id).update(input).first()
      }

      public async destroy(id: string): Promise<Recovery | null> {
            return await this.recovery.query().where('id', id).delete().first()
      }

      public static get Instance() {
            return this._instance || (this._instance = new this())
      }


      public async list(): Promise<Recovery[]> {
            return this.recovery.query().where('status', false).where('desaly', false)
      }
}
