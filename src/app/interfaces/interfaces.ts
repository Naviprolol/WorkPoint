export interface ICoworking {
  id: number
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
  tags: any[]
  user_id: number
  photos: File[]
  status: string
  created_at: string
}

export interface User {
  id: number
  name: string
  surname: string
  phone: string
  password: string
  role_id: number
  photo_user: string
  city: string
}


export interface Message {
  message: string
}

export interface Review {
  id: number
  user_id: number
  place_id: number
  rank: number
  body: string
  created_at: string
  user_name: string
  user_surname: string
  user_photo: string
  formattedDate: string
  showFullDescription: boolean
  isAnswer: boolean
  answerText: string
}

export interface IAd {
  id: number
  user_id: number
  id_place: number
  name: string
  city: string
  address: string
  tariff: string
  email: string
  status: string
  date_to: string
  date_from: string
  photo: string
}
