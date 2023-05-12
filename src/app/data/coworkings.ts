import { ICoworking } from "../interfaces/interfaces";


export const coworkings: ICoworking[] = [
  {
    id: '1',
    name: 'Simple coffee',
    isGoodPlace: true,
    rating: 4.6,
    city: 'Екатеринбург',
    district: 'Кировский',
    address: 'Проспект Ленина, 46',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer felis ante, sollicitudin a mauris sed, euismod cursus tortor. Integer a diam quis nisl facilisis hendrerit in id sapien',
    opening_hours: '',
    cost: 'Бесплатно',

    time: 'Ежедневно с 08:00 до 23:00',
    isFavorite: true,

    type_cafe: 'Кафе',
    company_phone: '+7(999)999-99-00',
    email: '',
    site: '',
    photo: ['https://static.tildacdn.com/tild3630-6262-4135-a236-646335383263/1-Simple-Coffee.jpg'],

    parking: false,
    recreation_area: true,
    conference_hall: false,

    tags: ['Кафе', 'Wi-Fi']
  },
  {
    id: '2',
    name: 'NAMES',
    isGoodPlace: true,
    rating: 4.8,
    city: 'Екатеринбург',
    district: 'Ленинский',
    address: 'Добролюбова, 16/2',
    description: 'NAMES — это место, где фрилансер, предприниматель и компания трудятся, живут, общаются и учатся вместе.',
    opening_hours: '',
    cost: 'Платно',

    time: 'Ежедневно с 08:00 до 22:00',
    isFavorite: false,

    type_cafe: 'Рабочий офис',
    company_phone: '+7(999)999-99-00',
    email: '',
    site: '',
    photo: ['https://image2.yell.ru/imager/MjI1MjY1YTEwODExMjlhNjhmY/565x000/responses/7/0/9/r_rddypyofer60ojj4_1572256661.jpg', 'https://static.tildacdn.com/tild6238-3535-4064-b231-313039353663/c4d843292be8948d64ad.jpg', 'https://static.tildacdn.com/tild3630-6262-4135-a236-646335383263/1-Simple-Coffee.jpg'],

    parking: true,
    recreation_area: true,
    conference_hall: true,

    tags: ['Wi-Fi', 'Зона отдыха', 'Розетки', 'klass']
  },
  {
    id: '3',
    name: 'LIVE коворкинг',
    isGoodPlace: true,
    rating: 3.0,
    city: 'Екатеринбург',
    district: 'Октябрьский',
    address: 'Красноармейская, 72',
    description: 'Live - это уникальное пространство в самом центре города, совмещающее два формата: удобный современный офис и уютную зону отдыха.',
    opening_hours: 'Круглосуточно',
    cost: 'Платно',

    time: 'Круглосуточно',
    isFavorite: false,

    type_cafe: 'Рабочий офис',
    company_phone: '+7(999)999-99-00',
    email: '',
    site: '',
    photo: ['https://static.tildacdn.com/tild6238-3535-4064-b231-313039353663/c4d843292be8948d64ad.jpg'],


    parking: true,
    recreation_area: false,
    conference_hall: true,

    tags: ['Wi-Fi', 'Зона отдыха', 'Розетки']
  }
]
