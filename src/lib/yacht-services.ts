
import { supabase, getUser } from './supabase';
import { Yacht } from './types';

export type YachtFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  yachtType: string;
  yachtLength: string;
  location: string;
  comments: string;
};

export type YachtListingData = {
  name: string;
  type: string;
  length: number;
  capacity: number;
  cabins: number;
  location: string;
  city: string;
  state: string;
  country: string;
  description: string;
  price_per_day: number;
  instant_book: boolean;
  year: number;
  amenities: string[];
  images: string[];
};

// Submit the yacht listing interest form (pre-registration)
export const submitYachtListingInterest = async (formData: YachtFormData) => {
  const user = await getUser();
  
  // Store the pre-registration data
  const { data, error } = await supabase
    .from('yacht_listing_requests')
    .insert({
      owner_id: user?.id || null,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      yacht_type: formData.yachtType,
      yacht_length: formData.yachtLength,
      location: formData.location,
      comments: formData.comments,
      status: 'pending',
      created_at: new Date().toISOString()
    });

  if (error) {
    console.error('Error submitting yacht listing interest:', error);
    throw error;
  }

  return data;
};

// Create a full yacht listing (after registration/approval)
export const createYachtListing = async (listingData: YachtListingData) => {
  const user = await getUser();
  
  if (!user) {
    throw new Error('You must be logged in to create a yacht listing');
  }

  const { data, error } = await supabase
    .from('yacht_listings')
    .insert({
      owner_id: user.id,
      name: listingData.name,
      type: listingData.type,
      length: listingData.length,
      capacity: listingData.capacity,
      cabins: listingData.cabins,
      location: listingData.location,
      city: listingData.city,
      state: listingData.state,
      country: listingData.country,
      description: listingData.description,
      price_per_day: listingData.price_per_day,
      instant_book: listingData.instant_book,
      year: listingData.year,
      amenities: listingData.amenities,
      images: listingData.images,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

  if (error) {
    console.error('Error creating yacht listing:', error);
    throw error;
  }

  return data;
};

// Get all yacht listings
export const getYachtListings = async (): Promise<Yacht[]> => {
  const { data, error } = await supabase
    .from('yacht_listings')
    .select('*');

  if (error) {
    console.error('Error fetching yacht listings:', error);
    throw error;
  }

  // Transform to match our Yacht type
  return data.map(yacht => ({
    id: yacht.id,
    name: yacht.name,
    description: yacht.description,
    type: yacht.type,
    imageUrl: yacht.images[0] || '',
    images: yacht.images,
    pricePerDay: yacht.price_per_day,
    capacity: yacht.capacity,
    length: yacht.length,
    cabins: yacht.cabins,
    location: {
      city: yacht.city,
      state: yacht.state,
      country: yacht.country,
      coordinates: {
        lat: yacht.lat || 0,
        lng: yacht.lng || 0
      }
    },
    amenities: yacht.amenities,
    rating: 0, // New listings start with no rating
    reviewCount: 0, // New listings start with no reviews
    captain: {
      included: false,
      optional: true
    },
    instantBook: yacht.instant_book,
    year: yacht.year,
    owner: {
      id: yacht.owner_id,
      name: '', // We'll need to fetch this separately
      avatarUrl: '',
      responseRate: 95,
      responseTime: '1 hour'
    }
  }));
};

// Get a single yacht by ID
export const getYachtById = async (id: string): Promise<Yacht | null> => {
  const { data, error } = await supabase
    .from('yacht_listings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching yacht:', error);
    if (error.code === 'PGRST116') {
      return null; // Not found
    }
    throw error;
  }

  if (!data) return null;

  // Transform to match our Yacht type
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    type: data.type,
    imageUrl: data.images[0] || '',
    images: data.images,
    pricePerDay: data.price_per_day,
    capacity: data.capacity,
    length: data.length,
    cabins: data.cabins,
    location: {
      city: data.city,
      state: data.state,
      country: data.country,
      coordinates: {
        lat: data.lat || 0,
        lng: data.lng || 0
      }
    },
    amenities: data.amenities,
    rating: 0,
    reviewCount: 0,
    captain: {
      included: false,
      optional: true
    },
    instantBook: data.instant_book,
    year: data.year,
    owner: {
      id: data.owner_id,
      name: '', // We'll need to fetch this separately
      avatarUrl: '',
      responseRate: 95,
      responseTime: '1 hour'
    }
  };
};
