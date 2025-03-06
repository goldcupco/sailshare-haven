
import { supabase, getUser } from './supabase';

export type BookingData = {
  yacht_id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  captain_included: boolean;
  guest_count: number;
  special_requests?: string;
};

// Create a new booking
export const createBooking = async (bookingData: BookingData) => {
  const user = await getUser();
  
  if (!user) {
    throw new Error('You must be logged in to create a booking');
  }

  const { data, error } = await supabase
    .from('bookings')
    .insert({
      yacht_id: bookingData.yacht_id,
      user_id: user.id,
      start_date: bookingData.start_date,
      end_date: bookingData.end_date,
      total_price: bookingData.total_price,
      status: 'pending', // Initial status
      captain_included: bookingData.captain_included,
      guest_count: bookingData.guest_count,
      special_requests: bookingData.special_requests || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

  if (error) {
    console.error('Error creating booking:', error);
    throw error;
  }

  return data;
};

// Get user's bookings
export const getUserBookings = async () => {
  const user = await getUser();
  
  if (!user) {
    throw new Error('You must be logged in to view your bookings');
  }

  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      yacht_listings(*)
    `)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error fetching user bookings:', error);
    throw error;
  }

  return data;
};

// Get owner's yacht bookings
export const getOwnerBookings = async () => {
  const user = await getUser();
  
  if (!user) {
    throw new Error('You must be logged in to view your bookings');
  }

  // First get owner's yachts
  const { data: yachts, error: yachtError } = await supabase
    .from('yacht_listings')
    .select('id')
    .eq('owner_id', user.id);

  if (yachtError) {
    console.error('Error fetching owner yachts:', yachtError);
    throw yachtError;
  }

  if (!yachts.length) return [];

  // Then get bookings for those yachts
  const yachtIds = yachts.map(yacht => yacht.id);
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      profiles(*)
    `)
    .in('yacht_id', yachtIds);

  if (error) {
    console.error('Error fetching yacht bookings:', error);
    throw error;
  }

  return data;
};

// Update booking status (for owners)
export const updateBookingStatus = async (bookingId: string, status: string) => {
  const user = await getUser();
  
  if (!user) {
    throw new Error('You must be logged in to update booking status');
  }

  // Check if user owns the yacht related to this booking
  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .select(`
      *,
      yacht_listings!inner(owner_id)
    `)
    .eq('id', bookingId)
    .single();

  if (bookingError) {
    console.error('Error fetching booking:', bookingError);
    throw bookingError;
  }

  if (booking.yacht_listings.owner_id !== user.id) {
    throw new Error('You do not have permission to update this booking');
  }

  // Update the booking status
  const { data, error } = await supabase
    .from('bookings')
    .update({
      status,
      updated_at: new Date().toISOString()
    })
    .eq('id', bookingId);

  if (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }

  return data;
};

// Cancel booking (for users)
export const cancelBooking = async (bookingId: string) => {
  const user = await getUser();
  
  if (!user) {
    throw new Error('You must be logged in to cancel a booking');
  }

  // Check if booking belongs to user
  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', bookingId)
    .eq('user_id', user.id)
    .single();

  if (bookingError) {
    console.error('Error fetching booking:', bookingError);
    throw bookingError;
  }

  // Update booking status to cancelled
  const { data, error } = await supabase
    .from('bookings')
    .update({
      status: 'cancelled',
      updated_at: new Date().toISOString()
    })
    .eq('id', bookingId);

  if (error) {
    console.error('Error cancelling booking:', error);
    throw error;
  }

  return data;
};
