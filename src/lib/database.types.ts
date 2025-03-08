
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
          name: string
          description: string | null
          type: string
          capacity: number
          length_ft: number
          year_built: number | null
          pricePerDay: number
          pricePerWeek: number | null
          instantBook: boolean
          city: string
          state: string
          country: string
          lat: number | null
          lng: number | null
          rating: number | null
          reviews_count: number
          main_image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          type: string
          capacity: number
          length_ft: number
          year_built?: number | null
          pricePerDay: number
          pricePerWeek?: number | null
          instantBook?: boolean
          city: string
          state: string
          country: string
          lat?: number | null
          lng?: number | null
          rating?: number | null
          reviews_count?: number
          main_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          type?: string
          capacity?: number
          length_ft?: number
          year_built?: number | null
          pricePerDay?: number
          pricePerWeek?: number | null
          instantBook?: boolean
          city?: string
          state?: string
          country?: string
          lat?: number | null
          lng?: number | null
          rating?: number | null
          reviews_count?: number
          main_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      yacht_images: {
        Row: {
          id: string
          yacht_id: string
          image_url: string
          is_main: boolean
          caption: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          yacht_id: string
          image_url: string
          is_main?: boolean
          caption?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          yacht_id?: string
          image_url?: string
          is_main?: boolean
          caption?: string | null
          sort_order?: number
          created_at?: string
        }
      }
      yacht_amenities: {
        Row: {
          id: string
          yacht_id: string
          amenity: string
          created_at: string
        }
        Insert: {
          id?: string
          yacht_id: string
          amenity: string
          created_at?: string
        }
        Update: {
          id?: string
          yacht_id?: string
          amenity?: string
          created_at?: string
        }
      }
    }
    Views: {
      yacht_listings_with_amenities: {
        Row: {
          id: string
          name: string
          description: string | null
          type: string
          capacity: number
          length_ft: number
          year_built: number | null
          pricePerDay: number
          pricePerWeek: number | null
          instantBook: boolean
          city: string
          state: string
          country: string
          lat: number | null
          lng: number | null
          rating: number | null
          reviews_count: number
          main_image_url: string | null
          created_at: string
          updated_at: string
          amenities: string[] | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
