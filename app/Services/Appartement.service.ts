import Appartement from "App/Models/Appartement";
import Images from "App/Models/ImageAppartement";
import i from "interface"

export default class AppartementService {

      private model = Appartement
      private img = Images

      public async find(param: i.IFindByKeyValue): Promise<Appartement | null> {
            return await this.model.query().where(param.key, param.value as string)
                  .preload("images").first()
      }

      public async findAll(params: i.IQAppartement): Promise<Appartement[]> {
            return await this.model.query()
                  .if(params.typeAppartement, (query) => {
                        query.where('type_appartement_id', params.typeAppartement)
                  })
                  .if(params.typeBien, (query) => {
                        query.where('type_bien_id', params.typeBien)
                  })
                  .preload("typeBien", (query) => {
                        query.select(['id', 'designation', 'description'])
                  })
                  .preload("typeAppartement", (query) => {
                        query.select(['id', 'designation', 'description'])
                  })
                  .preload("images")
                  .paginate(params.page, params.limit)
      }

      public async registre(input: i.IAppartement): Promise<Appartement> {
            return await this.model.create(input)
      }

      public async update(id: string, input: object): Promise<Appartement | null> {
            await this.model.query().where('id', id).update(input).first()
            return this.model.query().where('id', id).preload("images").first()
      }

      public async destroy(id: string): Promise<Appartement> {
            return await this.model.query().where('id', id).delete().first()
      }

      /**
       *  Images
       */

      public async findImg(param: i.IFindByKeyValue): Promise<Images | null> {
            return await this.img.query().where(param.key, param.value as string).first()
      }

      public async registreImg(input: i.IAppartementImage[]): Promise<Images[]> {
            return await this.img.createMany(input)
      }

      public async destroyImg(id: string): Promise<Images> {
            return await this.img.query().where('id', id).delete().first()
      }
}