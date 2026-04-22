export interface Property {
  id: string;
  title: string;
  type: 'Apartment' | 'Villa' | 'Commercial';
  price: number;
  location: string;
  image: string;
  beds: number;
  baths: number;
  sqft: number;
  description: string;
  amenities: string[];
}

export const properties: Property[] = [
  {
    id: 'p1',
    title: 'Azure Skyline Penthouse',
    type: 'Apartment',
    price: 85000000,
    location: 'Central Park, NY',
    image: '/images/real-estate/penthouse.png',
    beds: 4,
    baths: 5,
    sqft: 4500,
    description: 'Breathtaking 360-degree views of the New York City skyline. Features a private glass-bottom pool and professional-grade kitchen.',
    amenities: ['Private Pool', 'Gym', 'Concierge', 'Helipad Access', 'Smart Home']
  },
  {
    id: 'p2',
    title: 'Crystal Waters Villa',
    type: 'Villa',
    price: 125000000,
    location: 'Palm Jumeirah, Dubai',
    image: '/images/real-estate/villa.png',
    beds: 6,
    baths: 8,
    sqft: 12000,
    description: 'Modern architectural masterpiece on the water. Expansive terrace, private beach access, and lush internal courtyards.',
    amenities: ['Beach Access', 'Cinema Room', 'Wine Cellar', 'Staff Quarters', 'Infinity Pool']
  },
  {
    id: 'p3',
    title: 'The Obsidian Tower Office',
    type: 'Commercial',
    price: 450000000,
    location: 'Financial District, London',
    image: '/images/real-estate/commercial.png',
    beds: 0,
    baths: 12,
    sqft: 25000,
    description: 'Grade A corporate headquarters with state-of-the-art sustainability features and panoramic city floor plates.',
    amenities: ['24/7 Security', 'High-Speed Elevators', 'Roof Garden', 'Conference Center']
  },
  {
    id: 'p4',
    title: 'Minimalist Glass Studio',
    type: 'Apartment',
    price: 12000000,
    location: 'Shibuya, Tokyo',
    image: '/images/real-estate/studio.png',
    beds: 1,
    baths: 1,
    sqft: 850,
    description: 'Sleek, efficient, and inspiring. A perfect blend of Japanese minimalism and high-tech urban living.',
    amenities: ['Smart Glass', 'Zen Garden', 'Gym', 'Automated Parking']
  }
];
