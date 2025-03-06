
export interface Yacht {
  id: string;
  name: string;
  description: string;
  type: string;
  imageUrl: string;
  images: string[];
  pricePerDay: number;
  capacity: number;
  length: number;
  cabins: number;
  location: {
    city: string;
    state: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  amenities: string[];
  rating: number;
  reviewCount: number;
  captain: {
    included: boolean;
    optional: boolean;
    pricePerDay?: number;
  };
  instantBook: boolean;
  year: number;
  owner: {
    id: string;
    name: string;
    avatarUrl: string;
    responseRate: number;
    responseTime: string;
  };
}

export interface Location {
  id: string;
  name: string;
  imageUrl: string;
  count: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}
