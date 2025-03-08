
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';
import { toast } from "@/hooks/use-toast";

// Project configuration
const PROJECT_ID = "yxthrrmhtjudhhxlrjig";
const SUPABASE_URL = `https://${PROJECT_ID}.supabase.co`;
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4dGhycm1odGp1ZGhoeGxyamlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NzMzODYsImV4cCI6MjA1NzA0OTM4Nn0.Ks0gxcwIVe4eYRD4DW-Mmy5qQlq-ExB_Nk4nmZQvCXg';

// Log connection details for debugging
console.info('Initializing Supabase client with:', {
  url: SUPABASE_URL,
  keyPresent: !!SUPABASE_ANON_KEY,
  projectId: PROJECT_ID
});

// Create supabase client
export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// Cache the connection test result
let connectionTestResult: boolean | null = null;

// Test the connection
export const testSupabaseConnection = async (forceTest = false) => {
  // Return cached result if available and not forcing a new test
  if (connectionTestResult !== null && !forceTest) {
    return connectionTestResult;
  }
  
  try {
    console.log("Testing Supabase connection...");
    
    // Test connection by making a simple query to the newly created table
    const { data, error } = await supabase
      .from('yacht_listings')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Database query error:', error);
      throw error;
    }
    
    console.log("Database connected successfully:", data);
    toast({
      title: "Database Connected",
      description: "Successfully connected to the Supabase database",
    });
    
    connectionTestResult = true;
    return true;
  } catch (error: any) {
    console.error('Supabase connection error:', error);
    
    toast({
      title: "Database Connection Issue",
      description: error.message || "Could not connect to the database",
      variant: "destructive",
    });
    
    connectionTestResult = false;
    return false;
  }
};

// Clear the connection test cache
export const clearConnectionTestCache = () => {
  connectionTestResult = null;
};

// Get the current user
export const getUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = async () => {
  const user = await getUser();
  return !!user;
};
