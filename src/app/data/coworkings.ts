import { ICoworking } from "../interfaces/interfaces";


export const coworkings: ICoworking[] = [
  {
    id: 1,
    title: 'Simple coffee',
    isGoodPlace: true,
    rating: 4.6,
    image: 'https://static.tildacdn.com/tild3630-6262-4135-a236-646335383263/1-Simple-Coffee.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer felis ante, sollicitudin a mauris sed, euismod cursus tortor. Integer a diam quis nisl facilisis hendrerit in id sapien',
    address: 'Проспект Ленина, 46',
    time: 'Ежедневно с 08:00 до 23:00',
    isFavorite: true
  },
  {
    id: 2,
    title: 'NAMES',
    isGoodPlace: true,
    rating: 4.8,
    image: 'https://image2.yell.ru/imager/MjI1MjY1YTEwODExMjlhNjhmY/565x000/responses/7/0/9/r_rddypyofer60ojj4_1572256661.jpg',
    description: 'NAMES — это место, где фрилансер, предприниматель и компания трудятся, живут, общаются и учатся вместе.',
    address: 'Добролюбова, 16/2',
    time: 'Ежедневно с 08:00 до 22:00',
    isFavorite: false
  },
  {
    id: 3,
    title: 'LIVE коворкинг',
    isGoodPlace: true,
    rating: 3.0,
    image: 'https://static.tildacdn.com/tild6238-3535-4064-b231-313039353663/c4d843292be8948d64ad.jpg',
    description: 'Live - это уникальное пространство в самом центре города, совмещающее два формата: удобный современный офис и уютную зону отдыха.',
    address: 'Красноармейская, 72',
    time: 'Круглосуточно',
    isFavorite: false
  }
]
