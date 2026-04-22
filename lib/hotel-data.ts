import { Room } from './hotel-context';

export const rooms: Room[] = [
  {
    id: 'r1',
    name: 'Presidential Ocean Suite',
    description: 'A sprawling suite with panoramic views of the Atlantic, featuring a private infinity pool and 24/7 butler service.',
    price: 45000,
    image: '/images/hotel/suite-ocean.png',
    amenities: ['Ocean View', 'Private Pool', 'Butler', 'Spa Access', 'King Bed'],
    maxGuests: 4,
    size: '120 m²'
  },
  {
    id: 'r2',
    name: 'Skyline Executive Loft',
    description: 'Modern luxury overlooking the bustling city. High ceilings, floor-to-ceiling windows, and smart room controls.',
    price: 28000,
    image: '/images/hotel/loft-skyline.png',
    amenities: ['City View', 'Work Station', 'Coffee Bar', 'Smart Home', 'King Bed'],
    maxGuests: 2,
    size: '85 m²'
  },
  {
    id: 'r3',
    name: 'Heritage Garden Villa',
    description: 'Charming private villa surrounded by lush botanical gardens. Perfect for a peaceful retreat into nature.',
    price: 32000,
    image: '/images/hotel/villa-garden.png',
    amenities: ['Garden View', 'Outdoor Shower', 'Private Patio', 'Library', 'Queen Bed'],
    maxGuests: 3,
    size: '100 m²'
  },
  {
    id: 'r4',
    name: 'Modernist Studio',
    description: 'Minimalist design meets ultimate comfort. Ideal for business travelers seeking a clean, inspiring environment.',
    price: 15000,
    image: '/images/hotel/studio-modern.png',
    amenities: ['Fast WiFi', 'Kitchenette', 'Gym Access', 'Soundproof', 'Queen Bed'],
    maxGuests: 2,
    size: '55 m²'
  }
];
