import RentalLocation from "App/Models/RentalLocation"
import Guarantee from "App/Models/Guarantee"
import i from "interface"

export type TGuarantee = {
      MONTH: number
}

export default class LocationService {

      private rental = RentalLocation
      private guarantee = Guarantee
      private static _instance: LocationService
      public static guranteeMoth: number

      public async getRentals(params: i.IRentalQuerry): Promise<RentalLocation[]> {
            return await this.rental.query()
                  .preload('user', (query) => {
                        query.select(['id', 'name', 'lastname', 'country_code', 'phone_number', 'email', 'profile'])
                  })
                  .preload('landlord', (query) => {
                        query.select(['id', 'name', 'lastname', 'email', 'profile'])
                  })
                  .preload('appatement', (query) => {
                        query.select(['id', 'type_bien_id', 'type_appartement_id', 'number', 'description', 'features']).preload("typeBien", (query) => {
                              query.select(['id', 'designation', 'description'])
                        }).preload("typeAppartement", (query) => {
                              query.select(['id', 'designation', 'description'])
                        })
                  })
                  .orderBy(params.orderBy, 'desc').paginate(params.page, params.limit)
      }

      public async find(params: i.IFindByKeyValue, currenty?: boolean): Promise<RentalLocation | null> {
            return await this.rental.query().where(params.key, params.value as string)
                  .if(currenty, (query) => {
                        query.where('current', currenty as boolean)
                  })
                  .first()
      }

      public async registre(input: i.IRental): Promise<RentalLocation> {
            return await this.rental.create(input)
      }

      public async update(id: string, input: object): Promise<RentalLocation> {
            return await this.rental.query().where('id', id).update(input).first()
      }

      public async break(params: i.IBreakContrat, input: object): Promise<RentalLocation[]> {
            return await this.rental.query().where('appartement_id', params.appartementId).where('personne_id', params.perssonneId).update(input)
      }

      public async delete(id: string): Promise<RentalLocation> {
            return await this.rental.query().where('id', id).delete().first()
      }

      /**
       * Guarantee
       */

      public async getGuarantee(params: i.IGuaranteeQuerry): Promise<Guarantee[]> {
            return await this.guarantee.query().orderBy(params.orderBy, 'desc').paginate(params.page, params.limit)
      }

      public async findGuarantee(params: i.IFindByKeyValue): Promise<Guarantee | null> {
            return await this.guarantee.query().where(params.key, params.value as string).first()
      }

      public async registreGuarantee(input: i.IGuarantee): Promise<Guarantee> {
            return await this.guarantee.create(input)
      }

      public async deleteGuarantee(id: string): Promise<Guarantee> {
            return await this.rental.query().where('id', id).delete().first()
      }

      public static get Instance() {
            return this._instance || (this._instance = new this())
      }
}