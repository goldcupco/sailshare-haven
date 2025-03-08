
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';
import { toast } from "@/hooks/use-toast";

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Enhanced environment variable logging - immediately log when the module loads
console.log("%c🔑 Supabase Environment Check", "background: #3ECF8E; color: white; padding: 2px 5px; border-radius: 3px;", {
  urlDetected: !!supabaseUrl,
  urlValid: supabaseUrl?.includes('supabase.co'),
  urlLength: supabaseUrl?.length || 0,
  keyDetected: !!supabaseAnonKey,
  keyLength: supabaseAnonKey?.length || 0,
  timestamp: new Date().toISOString(),
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
    // Enhanced check for valid environment variables
    const hasValidEnvVars = !!supabaseUrl && !!supabaseAnonKey && 
                          supabaseUrl.includes('supabase.co') && 
                          supabaseAnonKey.length > 20;
    
    if (!hasValidEnvVars) {
      console.warn("Using demo Supabase credentials or invalid configuration detected.", {
        urlPresent: !!supabaseUrl,
        urlValid: supabaseUrl?.includes('supabase.co'),
        keyPresent: !!supabaseAnonKey,
        keyValidLength: supabaseAnonKey?.length > 20
      });
      
      toast({
        title: "Environment Variables Issue",
        description: "Supabase configuration issue detected. In Lovable.dev, try forcing a refresh using the button below.",
        variant: "destructive",
        duration: 6000,
      });
      
      connectionTestResult = false;
      return false;
    }
    
    // If we get here, environment variables are applied
    console.log("Using Supabase configuration:", { 
      url: supabaseUrl.substring(0, 15) + '...', // Log partial URL for security
      keyValid: supabaseAnonKey.length > 20
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

// Force a complete app refresh - useful for Lovable.dev environment
export const forceAppRefresh = () => {
  console.log("Forcing application refresh...");
  
  // Clear any cached connection data
  clearConnectionTestCache();
  
  // Force a complete page reload
  window.location.reload();
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
