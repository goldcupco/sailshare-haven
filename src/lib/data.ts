
import { Yacht, Location } from './types';

export const featuredYachts: Yacht[] = [
  {
    id: '1',
    name: 'Oceanic Splendor',
    description: 'Experience luxury on the water with this stunning yacht. Perfect for day cruises and special events.',
    type: 'Motor Yacht',
    imageUrl: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    images: [
      'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1609436132311-e4b0c9302506?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1569263900347-06b1e8c825ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80'
    ],
    pricePerDay: 1500,
    capacity: 12,
    length: 65,
    cabins: 3,
    location: {
      city: 'Miami',
      state: 'Florida',
      country: 'USA',
      coordinates: {
        lat: 25.7617,
        lng: -80.1918
      }
    },
    amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Sound System', 'Swimming Platform', 'Jacuzzi'],
    rating: 4.9,
    reviewCount: 48,
    captain: {
      included: true,
      optional: false
    },
    instantBook: true,
    year: 2020,
    owner: {
      id: 'o1',
      name: 'Alexander Smith',
      avatarUrl: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      responseRate: 99,
      responseTime: 'within an hour'
    }
  },
  {
    id: '2',
    name: 'Azure Dreams',
    description: 'Sleek and modern yacht perfect for exploring coastal regions and enjoying the open water.',
    type: 'Sailing Yacht',
    imageUrl: 'https://images.unsplash.com/photo-1621252179027-9262b9f40844?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    images: [
      'https://images.unsplash.com/photo-1621252179027-9262b9f40844?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1552074284-5e84d87aee4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1575633106061-deeca0c7a6cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1121&q=80'
    ],
    pricePerDay: 900,
    capacity: 8,
    length: 45,
    cabins: 2,
    location: {
      city: 'San Diego',
      state: 'California',
      country: 'USA',
      coordinates: {
        lat: 32.7157,
        lng: -117.1611
      }
    },
    amenities: ['WiFi', 'Kitchen', 'Sound System', 'Swimming Platform', 'Snorkeling Gear'],
    rating: 4.7,
    reviewCount: 35,
    captain: {
      included: false,
      optional: true,
      pricePerDay: 300
    },
    instantBook: false,
    year: 2019,
    owner: {
      id: 'o2',
      name: 'Sophia Williams',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80',
      responseRate: 95,
      responseTime: 'within a day'
    }
  },
  {
    id: '3',
    name: 'Horizon Chaser',
    description: 'Elegant and spacious yacht offering the ultimate luxury experience on the water.',
    type: 'Catamaran',
    imageUrl: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80',
    images: [
      'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80',
      'https://images.unsplash.com/photo-1566847438217-76e82d383f84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80',
      'https://images.unsplash.com/photo-1565620731358-e8c038abc8d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    ],
    pricePerDay: 1200,
    capacity: 10,
    length: 55,
    cabins: 4,
    location: {
      city: 'West Palm Beach',
      state: 'Florida',
      country: 'USA',
      coordinates: {
        lat: 26.7153,
        lng: -80.0534
      }
    },
    amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Sound System', 'Swimming Platform', 'Water Toys'],
    rating: 4.8,
    reviewCount: 42,
    captain: {
      included: true,
      optional: false
    },
    instantBook: true,
    year: 2021,
    owner: {
      id: 'o3',
      name: 'Daniel Johnson',
      avatarUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1167&q=80',
      responseRate: 98,
      responseTime: 'within a few hours'
    }
  },
  {
    id: '4',
    name: 'Crystal Waters',
    description: 'Luxury yacht perfect for special occasions and unforgettable experiences on the water.',
    type: 'Motor Yacht',
    imageUrl: 'https://images.unsplash.com/photo-1616688311293-ed53caec04b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
    images: [
      'https://images.unsplash.com/photo-1616688311293-ed53caec04b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
      'https://images.unsplash.com/photo-1626768614296-7a75bb5afa5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      'https://images.unsplash.com/photo-1628690622682-165b50913fb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    ],
    pricePerDay: 2000,
    capacity: 15,
    length: 75,
    cabins: 5,
    location: {
      city: 'Marina del Rey',
      state: 'California',
      country: 'USA',
      coordinates: {
        lat: 33.9802,
        lng: -118.4517
      }
    },
    amenities: ['WiFi', 'Air Conditioning', 'Full Kitchen', 'Premium Sound System', 'Swimming Platform', 'Jacuzzi', 'Water Slide'],
    rating: 5.0,
    reviewCount: 52,
    captain: {
      included: true,
      optional: false
    },
    instantBook: false,
    year: 2022,
    owner: {
      id: 'o4',
      name: 'Isabella Martin',
      avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      responseRate: 100,
      responseTime: 'within an hour'
    }
  },
];

export const popularLocations: Location[] = [
  {
    id: 'l1',
    name: 'Miami, Florida',
    imageUrl: 'https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
    count: 125,
    coordinates: {
      lat: 25.7617,
      lng: -80.1918
    }
  },
  {
    id: 'l2',
    name: 'San Diego, California',
    imageUrl: 'https://images.unsplash.com/photo-1538397330368-596e0e15ecae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
    count: 98,
    coordinates: {
      lat: 32.7157,
      lng: -117.1611
    }
  },
  {
    id: 'l3',
    name: 'Newport, Rhode Island',
    imageUrl: 'https://images.unsplash.com/photo-1600699260196-7ee7ef31f070?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
    count: 65,
    coordinates: {
      lat: 41.4901,
      lng: -71.3128
    }
  },
  {
    id: 'l4',
    name: 'Seattle, Washington',
    imageUrl: 'https://images.unsplash.com/photo-1502175353174-a7a70e73b362?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
    count: 82,
    coordinates: {
      lat: 47.6062,
      lng: -122.3321
    }
  }
];

export const allYachts: Yacht[] = [...featuredYachts];
