
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';
import { toast } from "@/hooks/use-toast";

// Get the direct values from the config.toml file when available
const CONFIG_PROJECT_ID = "yxthrrmhtjudhhxlrjig";

// Build the URL from the project ID or use environment variable
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || `https://${CONFIG_PROJECT_ID}.supabase.co`;

// Use the anon key from environment or use the value from console
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4dGhycm1odGp1ZGhoeGxyamlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NzMzODYsImV4cCI6MjA1NzA0OTM4Nn0.Ks0gxcwIVe4eYRD4DW-Mmy5qQlq-ExB_Nk4nmZQvCXg';

// Enhanced environment variable logging - immediately log when the module loads
console.log("%c🔑 Supabase Connection Details", "background: #3ECF8E; color: white; padding: 2px 5px; border-radius: 3px;", {
  url: supabaseUrl,
  keyLength: supabaseAnonKey?.length || 0,
  configProjectId: CONFIG_PROJECT_ID,
  timestamp: new Date().toISOString(),
  isUsingDirectConfig: !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY
});

// Create supabase client
export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey
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
    console.log("Testing Supabase connection with:", { 
      url: supabaseUrl.substring(0, 25) + '...', 
      keyValid: supabaseAnonKey.length > 20
    });
    
    // Test connection by making a simple query
    const { data, error } = await supabase.from('yacht_listings').select('count').limit(1);
    
    if (error) {
      // Check if this is a "relation does not exist" error - that's okay for a new project
      if (error.message && error.message.includes('relation "yacht_listings" does not exist')) {
        console.log("Table doesn't exist yet, but connection works");
        toast({
          title: "Database Connected",
          description: "Connected to Supabase, but no tables exist yet. Your database is ready to use!",
          duration: 5000,
        });
        connectionTestResult = true;
        return true;
      }
      
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
      title: "Database Connection Issue",
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
