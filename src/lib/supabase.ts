
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';
import { toast } from "@/hooks/use-toast";

// Get environment variables with fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Validate that the required environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing. Check your environment variables.');
}

// Create supabase client
export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey
);

// Test the connection and show a toast message
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('yacht_listings').select('count').limit(1);
    
    if (error) {
      throw error;
    }
    
    console.log("Database connected successfully:", data);
    
    toast({
      title: "Database Connected",
      description: "Successfully connected to the Supabase database",
    });
    
    return true;
  } catch (error: any) {
    console.error('Supabase connection error:', error);
    
    toast({
      title: "Database Connection Failed",
      description: error.message || "Could not connect to the database. Check your configuration.",
      variant: "destructive",
    });
    
    return false;
  }
};

export const getUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Error getting user:', error);
      return null;
    }
    
    return user;
  } catch (error) {
    console.error('Unexpected error getting user:', error);
    return null;
  }
};

export const isAuthenticated = async () => {
  const user = await getUser();
  return !!user;
};
