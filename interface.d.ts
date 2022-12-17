import TypeAppartement from "App/Models/TypeAppartement"

/*
* - A L L -
*/
export interface ISimpleRegistre {
      designation: string
      description?: string
}

export interface IFindByKeyValue {
      key: string,
      value?: string
}

export interface IFindAddress {
      entreprise_id: string,
      id: string
}

export interface IQuerry {
      page: number,
      limit: number,
      status?: boolean,
      orderBy: string,
}

/**
 * - User -
 */
export interface IUser {
      password: string
      email: string
}

/**
 * - User -
 */
export interface IEntreprise {
      designation: string
      description: string
      rccm: string
      logo?: string
      // address: [IAddress]
      // bank_accounts: [IBankAcount]

}

export interface IAddress {
      entreprise_id?: string
      country: string
      town: string
      city: string
      quarter: string
      street: string
      number: number
}

export interface IAppartAddress {
      appartement_id?: string
      country: string
      town: string
      city: string
      quarter: string
      street: string
      number: number
}

export interface IBankAcount {
      entreprise_id?: string
      bank: string
      account_name: string
      account_number: number
}

/**
 * Appartement
 */

export interface IQAppartement extends IQuerry {
      typeAppartement: string
      typeBien: string
}

export interface IAppartement {
      typeBienId: string
      typeAppartementId: string
      description: string
      features: string
      number?: number
}

export interface IAppartementImage {
      appartement_id?: string
      url: string
}

export interface IImage {

      url: string
}

/**
 * Personnes
 */

export interface IPersonne {
      name: string,
      lastname: string,
      email: string
      profile?: string
      cardType: string
      cardTypeId: string
}

export interface IUpdatePersonne {
      name: string,
      latsname: string,
      email: string
      cardType: string
      cardTypeId: string
}

export interface IPhone {
      personnes_id?: string,
      country_code: string,
      number: string
}