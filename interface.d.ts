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

export interface IBankAcount {
      entreprise_id?: string
      bank: string
      account_name: string
      account_number: number
}