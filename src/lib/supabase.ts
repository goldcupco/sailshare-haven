
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';
import { toast } from "@/hooks/use-toast";

// Get environment variables with fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://supabase-demo.example.com';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-anon-key';

// Create supabase client
export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey
);

// Test the connection and show a toast message
export const testSupabaseConnection = async () => {
  try {
    // Check if we're using demo credentials
    if (supabaseUrl === 'https://supabase-demo.example.com') {
      console.warn("Using demo Supabase credentials. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables for production use.");
      
      // Show a toast notification that will auto-dismiss after 5 seconds
      toast({
        title: "Environment Variables Not Applied",
        description: "If you've created an .env file, you may need to refresh the project or restart the server for changes to take effect.",
        variant: "destructive",
        duration: 5000,
      });
      
      return false;
    }
    
    const { data, error } = await supabase.from('yacht_listings').select('count').limit(1);
    
    if (error) {
      throw error;
    }
    
    console.log("Database connected successfully:", data);
    
    // Show a toast notification that will auto-dismiss after 3 seconds
    toast({
      title: "Database Connected",
      description: "Successfully connected to the Supabase database",
      duration: 3000,
    });
    
    return true;
  } catch (error: any) {
    console.error('Supabase connection error:', error);
    
    // Show a toast notification that will auto-dismiss after 5 seconds
    toast({
      title: "Database Connection Failed",
      description: error.message || "Could not connect to the database. Check your configuration.",
      variant: "destructive",
      duration: 5000,
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
