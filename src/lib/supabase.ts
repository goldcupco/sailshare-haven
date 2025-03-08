import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';
import { toast } from "@/hooks/use-toast";

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Improved check for valid environment variables - with logging
console.log("Environment check:", {
  supabaseUrlPresent: !!supabaseUrl,
  supabaseKeyPresent: !!supabaseAnonKey,
  supabaseUrlLength: supabaseUrl?.length || 0,
});

// Create the final variables based on environment availability
const finalSupabaseUrl = supabaseUrl || 'https://supabase-demo.example.com';
const finalSupabaseAnonKey = supabaseAnonKey || 'demo-anon-key';

// Create supabase client
export const supabase = createClient<Database>(
  finalSupabaseUrl,
  finalSupabaseAnonKey
);

// Cache the connection test result to prevent multiple toasts
let connectionTestResult: boolean | null = null;

// Test the connection and show a toast message
export const testSupabaseConnection = async (forceTest = false) => {
  // Return cached result if available and not forcing a new test
  if (connectionTestResult !== null && !forceTest) {
    console.log("Using cached connection test result:", connectionTestResult);
    return connectionTestResult;
  }
  
  try {
    // Check if we're using real credentials
    const hasValidEnvVars = !!supabaseUrl && !!supabaseAnonKey && 
                          supabaseUrl.includes('supabase.co');
    
    if (!hasValidEnvVars) {
      console.warn("Using demo Supabase credentials. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables for production use.");
      
      toast({
        title: "Environment Variables Not Detected",
        description: "Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file and restart the dev server.",
        variant: "destructive",
        duration: 5000,
      });
      
      connectionTestResult = false;
      return false;
    }
    
    // If we get here, environment variables are applied
    console.log("Using Supabase configuration:", { 
      url: supabaseUrl.substring(0, 15) + '...', // Log partial URL for security
      hasKey: !!supabaseAnonKey
    });
    
    // Test connection by making a simple query
    const { data, error } = await supabase.from('yacht_listings').select('count').limit(1);
    
    if (error) {
      throw error;
    }
    
    console.log("Database connected successfully:", data);
    
    toast({
      title: "Database Connected",
      description: "Successfully connected to the Supabase database",
      duration: 3000,
    });
    
    connectionTestResult = true;
    return true;
  } catch (error: any) {
    console.error('Supabase connection error:', error);
    
    toast({
      title: "Database Connection Error",
      description: error.message || "Could not connect to the database. Check your configuration.",
      variant: "destructive",
      duration: 5000,
    });
    
    connectionTestResult = false;
    return false;
  }
};

// Clear the connection test cache - useful when refreshing the app
export const clearConnectionTestCache = () => {
  connectionTestResult = null;
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
