
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Create supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const isAuthenticated = async () => {
  const user = await getUser();
  return !!user;
};
