import {Offer} from '../types/offer.ts';

const offers: Offer[] = [
  {
    id: 'amsterdam-canal-studio',
    title: 'Beautiful & luxurious studio at great location',
    type: 'Apartment',
    price: 120,
    city: 'Amsterdam',
    previewImage: '/img/apartment-01.jpg',
    images: [
      '/img/room.jpg',
      '/img/apartment-01.jpg',
      '/img/apartment-02.jpg',
      '/img/apartment-03.jpg',
      '/img/studio-01.jpg',
      '/img/studio-photos.jpg'
    ],
    isPremium: true,
    isFavorite: true,
    rating: 4.8,
    bedrooms: 3,
    maxAdults: 4,
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Baby seat',
      'Kitchen',
      'Dishwasher',
      'Cable TV',
      'Fridge'
    ],
    host: {
      name: 'Angelina',
      avatarUrl: '/img/avatar-angelina.jpg',
      isPro: true
    },
    description: [
      'A quiet cozy apartment near the canal with lots of daylight and a calm inner courtyard.',
      'You can walk to the city center in minutes, while the apartment itself stays peaceful in the evening.'
    ]
  },
  {
    id: 'amsterdam-wood-room',
    title: 'Wood and stone place',
    type: 'Room',
    price: 80,
    city: 'Amsterdam',
    previewImage: '/img/room.jpg',
    images: [
      '/img/room.jpg',
      '/img/apartment-02.jpg',
      '/img/apartment-03.jpg',
      '/img/studio-01.jpg',
      '/img/apartment-01.jpg',
      '/img/studio-photos.jpg'
    ],
    isPremium: false,
    isFavorite: true,
    rating: 4.0,
    bedrooms: 1,
    maxAdults: 2,
    goods: [
      'Wi-Fi',
      'Breakfast',
      'Heating',
      'Towels',
      'Fridge'
    ],
    host: {
      name: 'Max',
      avatarUrl: '/img/avatar-max.jpg',
      isPro: false
    },
    description: [
      'A compact room with warm wooden accents and a comfortable workspace.',
      'Great for a short city break if you want to stay close to museums and cafes.'
    ]
  },
  {
    id: 'amsterdam-big-bed-apartment',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    price: 180,
    city: 'Amsterdam',
    previewImage: '/img/apartment-03.jpg',
    images: [
      '/img/apartment-03.jpg',
      '/img/apartment-01.jpg',
      '/img/apartment-02.jpg',
      '/img/room.jpg',
      '/img/studio-01.jpg',
      '/img/studio-photos.jpg'
    ],
    isPremium: true,
    isFavorite: true,
    rating: 5.0,
    bedrooms: 2,
    maxAdults: 3,
    goods: [
      'Wi-Fi',
      'Kitchen',
      'Dishwasher',
      'Washing machine',
      'Coffee machine',
      'Cable TV'
    ],
    host: {
      name: 'Olivia',
      avatarUrl: '/img/avatar-angelina.jpg',
      isPro: true
    },
    description: [
      'A stylish apartment with a spacious bedroom and soft natural colors throughout the interior.',
      'Ideal for guests who want more space without leaving the central districts of Amsterdam.'
    ]
  },
  {
    id: 'amsterdam-prinsengracht-view',
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    price: 132,
    city: 'Amsterdam',
    previewImage: '/img/apartment-02.jpg',
    images: [
      '/img/apartment-02.jpg',
      '/img/apartment-01.jpg',
      '/img/room.jpg',
      '/img/apartment-03.jpg',
      '/img/studio-01.jpg',
      '/img/studio-photos.jpg'
    ],
    isPremium: false,
    isFavorite: false,
    rating: 4.2,
    bedrooms: 2,
    maxAdults: 4,
    goods: [
      'Wi-Fi',
      'Kitchen',
      'Heating',
      'Towels',
      'Coffee machine',
      'Fridge'
    ],
    host: {
      name: 'Sophie',
      avatarUrl: '/img/avatar-max.jpg',
      isPro: false
    },
    description: [
      'Bright apartment with canal views, tall windows and a fully equipped kitchen.',
      'A good choice if you want to stay in a classic Amsterdam house with easy transport access.'
    ]
  }
];

export {offers};
