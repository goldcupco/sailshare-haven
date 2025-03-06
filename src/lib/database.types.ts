
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      yacht_listings: {
        Row: {
          id: string
          owner_id: string
          name: string
          type: string
          length: number
          capacity: number
          cabins: number
          location: string
          city: string
          state: string
          country: string
          lat: number | null
          lng: number | null
          description: string
          price_per_day: number
          instant_book: boolean
          year: number
          amenities: string[]
          images: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          name: string
          type: string
          length: number
          capacity: number
          cabins: number
          location: string
          city: string
          state: string
          country: string
          lat?: number | null
          lng?: number | null
          description: string
          price_per_day: number
          instant_book: boolean
          year: number
          amenities: string[]
          images: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          name?: string
          type?: string
          length?: number
          capacity?: number
          cabins?: number
          location?: string
          city?: string
          state?: string
          country?: string
          lat?: number | null
          lng?: number | null
          description?: string
          price_per_day?: number
          instant_book?: boolean
          year?: number
          amenities?: string[]
          images?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          yacht_id: string
          user_id: string
          start_date: string
          end_date: string
          total_price: number
          status: string
          captain_included: boolean
          guest_count: number
          special_requests: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          yacht_id: string
          user_id: string
          start_date: string
          end_date: string
          total_price: number
          status: string
          captain_included: boolean
          guest_count: number
          special_requests?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          yacht_id?: string
          user_id?: string
          start_date?: string
          end_date?: string
          total_price?: number
          status?: string
          captain_included?: boolean
          guest_count?: number
          special_requests?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          avatar_url: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name: string
          last_name: string
          avatar_url?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string
          last_name?: string
          avatar_url?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
