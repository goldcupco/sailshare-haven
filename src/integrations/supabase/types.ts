export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      yacht_amenities: {
        Row: {
          amenity: string
          created_at: string | null
          id: string
          yacht_id: string
        }
        Insert: {
          amenity: string
          created_at?: string | null
          id?: string
          yacht_id: string
        }
        Update: {
          amenity?: string
          created_at?: string | null
          id?: string
          yacht_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "yacht_amenities_yacht_id_fkey"
            columns: ["yacht_id"]
            isOneToOne: false
            referencedRelation: "yacht_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "yacht_amenities_yacht_id_fkey"
            columns: ["yacht_id"]
            isOneToOne: false
            referencedRelation: "yacht_listings_with_amenities"
            referencedColumns: ["id"]
          },
        ]
      }
      yacht_images: {
        Row: {
          caption: string | null
          created_at: string | null
          id: string
          image_url: string
          is_main: boolean | null
          sort_order: number | null
          yacht_id: string
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          id?: string
          image_url: string
          is_main?: boolean | null
          sort_order?: number | null
          yacht_id: string
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          id?: string
          image_url?: string
          is_main?: boolean | null
          sort_order?: number | null
          yacht_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "yacht_images_yacht_id_fkey"
            columns: ["yacht_id"]
            isOneToOne: false
            referencedRelation: "yacht_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "yacht_images_yacht_id_fkey"
            columns: ["yacht_id"]
            isOneToOne: false
            referencedRelation: "yacht_listings_with_amenities"
            referencedColumns: ["id"]
          },
        ]
      }
      yacht_listings: {
        Row: {
          capacity: number
          city: string
          country: string
          created_at: string | null
          description: string | null
          id: string
          instantbook: boolean | null
          lat: number | null
          length_ft: number
          lng: number | null
          main_image_url: string | null
          name: string
          priceperday: number
          priceperweek: number | null
          rating: number | null
          reviews_count: number | null
          state: string
          type: string
          updated_at: string | null
          year_built: number | null
        }
        Insert: {
          capacity: number
          city: string
          country: string
          created_at?: string | null
          description?: string | null
          id?: string
          instantbook?: boolean | null
          lat?: number | null
          length_ft: number
          lng?: number | null
          main_image_url?: string | null
          name: string
          priceperday: number
          priceperweek?: number | null
          rating?: number | null
          reviews_count?: number | null
          state: string
          type: string
          updated_at?: string | null
          year_built?: number | null
        }
        Update: {
          capacity?: number
          city?: string
          country?: string
          created_at?: string | null
          description?: string | null
          id?: string
          instantbook?: boolean | null
          lat?: number | null
          length_ft?: number
          lng?: number | null
          main_image_url?: string | null
          name?: string
          priceperday?: number
          priceperweek?: number | null
          rating?: number | null
          reviews_count?: number | null
          state?: string
          type?: string
          updated_at?: string | null
          year_built?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      yacht_listings_with_amenities: {
        Row: {
          amenities: string[] | null
          capacity: number | null
          city: string | null
          country: string | null
          created_at: string | null
          description: string | null
          id: string | null
          instantbook: boolean | null
          lat: number | null
          length_ft: number | null
          lng: number | null
          main_image_url: string | null
          name: string | null
          priceperday: number | null
          priceperweek: number | null
          rating: number | null
          reviews_count: number | null
          state: string | null
          type: string | null
          updated_at: string | null
          year_built: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
