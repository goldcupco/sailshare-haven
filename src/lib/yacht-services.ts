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

// Get all yacht listings from Supabase
export const getYachtListings = async (): Promise<Yacht[]> => {
  try {
    console.log("Fetching yacht listings from Supabase...");
    
    // Get all yacht listings with their amenities using the view
    const { data: listings, error: listingsError } = await supabase
      .from('yacht_listings_with_amenities')
      .select('*');
    
    if (listingsError) {
      console.error('Error fetching yacht listings:', listingsError);
      throw listingsError;
    }
    
    console.log(`Retrieved ${listings?.length || 0} yacht listings`);
    
    // If no listings found, return empty array
    if (!listings || listings.length === 0) {
      return [];
    }
    
    // Get all yacht images
    const { data: allImages, error: imagesError } = await supabase
      .from('yacht_images')
      .select('*')
      .in('yacht_id', listings.map(listing => listing.id));
    
    if (imagesError) {
      console.error('Error fetching yacht images:', imagesError);
      throw imagesError;
    }
    
    // Transform database results to match our Yacht type
    const transformedYachts: Yacht[] = listings.map(listing => {
      // Get all images for this yacht
      const yachtImages = allImages
        ? allImages
            .filter(img => img.yacht_id === listing.id)
            .sort((a, b) => a.sort_order - b.sort_order)
            .map(img => img.image_url)
        : [];
      
      // Use main_image_url as first image if available, otherwise use first image from yachtImages array
      const imageUrl = listing.main_image_url || (yachtImages.length > 0 ? yachtImages[0] : '');
      
      return {
        id: listing.id,
        name: listing.name,
        description: listing.description || '',
        type: listing.type,
        imageUrl: imageUrl,
        images: yachtImages.length > 0 ? yachtImages : [imageUrl], // Use yachtImages if available, fallback to single image
        pricePerDay: listing.priceperday || 0,
        capacity: listing.capacity || 0,
        length: listing.length_ft || 0,
        cabins: Math.floor(listing.capacity / 3) || 1, // Estimate cabins from capacity if not provided
        location: {
          city: listing.city || '',
          state: listing.state || '',
          country: listing.country || '',
          coordinates: {
            lat: listing.lat || 0,
            lng: listing.lng || 0
          }
        },
        amenities: listing.amenities || [],
        rating: listing.rating || 4.5,
        reviewCount: listing.reviews_count || 0,
        captain: {
          included: false,
          optional: true
        },
        instantBook: listing.instantbook || false,
        year: listing.year_built || new Date().getFullYear() - 2,
        owner: {
          id: 'owner_id', // This would ideally come from the database
          name: 'Yacht Owner', // This would ideally come from the database
          avatarUrl: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40',
          responseRate: 95,
          responseTime: 'within a few hours'
        }
      };
    });
    
    console.log(`Transformed ${transformedYachts.length} yacht listings`);
    return transformedYachts;
  } catch (error) {
    console.error('Error in getYachtListings:', error);
    throw error;
  }
};

// Get a single yacht by ID
export const getYachtById = async (id: string): Promise<Yacht | null> => {
  try {
    // Get the yacht from the view that includes amenities
    const { data: listing, error: listingError } = await supabase
      .from('yacht_listings_with_amenities')
      .select('*')
      .eq('id', id)
      .single();
    
    if (listingError) {
      console.error('Error fetching yacht:', listingError);
      return null;
    }
    
    if (!listing) return null;
    
    // Get all images for this yacht
    const { data: images, error: imagesError } = await supabase
      .from('yacht_images')
      .select('*')
      .eq('yacht_id', id)
      .order('sort_order', { ascending: true });
    
    if (imagesError) {
      console.error('Error fetching yacht images:', imagesError);
      throw imagesError;
    }
    
    const yachtImages = images ? images.map(img => img.image_url) : [];
    const imageUrl = listing.main_image_url || (yachtImages.length > 0 ? yachtImages[0] : '');
    
    // Transform to match our Yacht type
    return {
      id: listing.id,
      name: listing.name,
      description: listing.description || '',
      type: listing.type,
      imageUrl: imageUrl,
      images: yachtImages.length > 0 ? yachtImages : [imageUrl], // Use yachtImages if available, fallback to single image
      pricePerDay: listing.priceperday || 0,
      capacity: listing.capacity || 0,
      length: listing.length_ft || 0,
      cabins: Math.floor(listing.capacity / 3) || 1, // Estimate cabins from capacity if not provided
      location: {
        city: listing.city || '',
        state: listing.state || '',
        country: listing.country || '',
        coordinates: {
          lat: listing.lat || 0,
          lng: listing.lng || 0
        }
      },
      amenities: listing.amenities || [],
      rating: listing.rating || 4.5,
      reviewCount: listing.reviews_count || 0,
      captain: {
        included: false,
        optional: true
      },
      instantBook: listing.instantbook || false,
      year: listing.year_built || new Date().getFullYear() - 2,
      owner: {
        id: 'owner_id', // This would ideally come from the database
        name: 'Yacht Owner', // This would ideally come from the database
        avatarUrl: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40',
        responseRate: 95,
        responseTime: 'within a few hours'
      }
    };
  } catch (error) {
    console.error('Error in getYachtById:', error);
    return null;
  }
};
