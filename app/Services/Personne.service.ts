import Personne from "App/Models/Personne"
import Phones from "App/Models/PersonnePhone"
import i from "interface"

export default class PersonneService {
      private personne = Personne
      private phone = Phones

      public async getAll(parms: i.IQuerry): Promise<Personne[]> {
            return await this.personne.query()
                  .preload("phones")
                  .orderBy(parms.orderBy, 'desc')
                  .paginate(parms.page, parms.limit)
      }

      public async find(parms: i.IFindByKeyValue): Promise<Personne | null> {
            return await this.personne.query().where(parms.key, parms.value as string).preload("phones").first()
      }

      public async create(input: i.IPersonne): Promise<Personne> {
            return await this.personne.create(input)
      }

      public async update(id: string, input: i.IPersonne): Promise<Personne | null> {
            await this.personne.query().where('id', id).update(input).first()
            return await this.personne.query().where('id', id).first()
      }

      public async delete(id: string): Promise<Personne | null> {
            return await this.personne.query().where('id', id).delete().first()
      }

      /**
       * phones
       */
      public async findPhone(parms: i.IFindByKeyValue): Promise<Phones | null> {
            return await this.phone.query().where(parms.key, parms.value as string).first()
      }

      public async registrePhone(input: i.IPhone[]): Promise<Phones[]> {
            return await this.phone.createMany(input)
      }

      public async updatePhone(id: string, input: i.IPhone | i.IPhoneRunning): Promise<Phones> {
            return await this.phone.query().where('id', id).update(input).first()
      }
      public async updatePhoneDefault(id: string): Promise<Phones[]> {
            return await this.phone.query().where('personne_id', id).update({ running: false })
      }

      public async deletePhone(id: string): Promise<Phones> {
            return await this.phone.query().where('id', id).delete().first()
      }

}