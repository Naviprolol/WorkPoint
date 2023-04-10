export interface ICoworking {
  id: number
  title: string
  isGoodPlace: boolean
  rating: number
  image: string
  description: string
  address: string
  time: string
  isFavorite: boolean
}

export interface User {
  name: string
  lastName: string
  phone: string
  password: string
}
