export interface ICoworking {
  id: string
  name: string
  isGoodPlace: boolean
  rating: number
  photo?: any
  description: string
  city: string
  address: string
  time: string
  opening_hours: string
  cost: string
  isFavorite: boolean,
  district: string,
  type_cafe: string,
  company_phone: string,
  email: string
  site: string
  workHours?: string
  parking: boolean,
  recreation_area: boolean,
  conference_hall: boolean
  tags: string[]
}

export interface User {
  name: string
  lastName: string
  phone: string
  password: string
  type: number
}


export interface Message {
  message: string
}
