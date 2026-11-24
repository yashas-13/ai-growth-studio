export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          body: string | null
          completed_at: string | null
          contact_id: string | null
          created_at: string
          created_by: string | null
          deal_id: string | null
          due_at: string | null
          id: string
          kind: string
          lead_id: string | null
          subject: string
          workspace_id: string
        }
        Insert: {
          body?: string | null
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          deal_id?: string | null
          due_at?: string | null
          id?: string
          kind: string
          lead_id?: string | null
          subject: string
          workspace_id: string
        }
        Update: {
          body?: string | null
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          deal_id?: string | null
          due_at?: string | null
          id?: string
          kind?: string
          lead_id?: string | null
          subject?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activities_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_events: {
        Row: {
          action: string
          actor_user_id: string | null
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          metadata: Json
          workspace_id: string
        }
        Insert: {
          action: string
          actor_user_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          metadata?: Json
          workspace_id: string
        }
        Update: {
          action?: string
          actor_user_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          metadata?: Json
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_events_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      brand_assets: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          mime_type: string | null
          name: string
          size_bytes: number | null
          storage_path: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          mime_type?: string | null
          name: string
          size_bytes?: number | null
          storage_path: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          mime_type?: string | null
          name?: string
          size_bytes?: number | null
          storage_path?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "brand_assets_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      brand_profiles: {
        Row: {
          audience: string | null
          brand_name: string
          created_at: string
          description: string | null
          id: string
          primary_color: string | null
          secondary_color: string | null
          updated_at: string
          voice: string | null
          website: string | null
          workspace_id: string
        }
        Insert: {
          audience?: string | null
          brand_name: string
          created_at?: string
          description?: string | null
          id?: string
          primary_color?: string | null
          secondary_color?: string | null
          updated_at?: string
          voice?: string | null
          website?: string | null
          workspace_id: string
        }
        Update: {
          audience?: string | null
          brand_name?: string
          created_at?: string
          description?: string | null
          id?: string
          primary_color?: string | null
          secondary_color?: string | null
          updated_at?: string
          voice?: string | null
          website?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "brand_profiles_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: true
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          budget: number
          channel: string | null
          created_at: string
          created_by: string | null
          description: string | null
          ends_at: string | null
          id: string
          name: string
          starts_at: string | null
          status: Database["public"]["Enums"]["campaign_status"]
          updated_at: string
          workspace_id: string
        }
        Insert: {
          budget?: number
          channel?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          ends_at?: string | null
          id?: string
          name: string
          starts_at?: string | null
          status?: Database["public"]["Enums"]["campaign_status"]
          updated_at?: string
          workspace_id: string
        }
        Update: {
          budget?: number
          channel?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          ends_at?: string | null
          id?: string
          name?: string
          starts_at?: string | null
          status?: Database["public"]["Enums"]["campaign_status"]
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          created_at: string
          domain: string | null
          id: string
          industry: string | null
          name: string
          notes: string | null
          updated_at: string
          website: string | null
          workspace_id: string
        }
        Insert: {
          created_at?: string
          domain?: string | null
          id?: string
          industry?: string | null
          name: string
          notes?: string | null
          updated_at?: string
          website?: string | null
          workspace_id: string
        }
        Update: {
          created_at?: string
          domain?: string | null
          id?: string
          industry?: string | null
          name?: string
          notes?: string | null
          updated_at?: string
          website?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "companies_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      competitors: {
        Row: {
          created_at: string
          id: string
          name: string
          notes: string | null
          website: string | null
          workspace_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          notes?: string | null
          website?: string | null
          workspace_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
          website?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "competitors_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          company_id: string | null
          created_at: string
          email: string | null
          first_name: string
          id: string
          last_name: string | null
          phone: string | null
          source: string | null
          title: string | null
          updated_at: string
          workspace_id: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          email?: string | null
          first_name: string
          id?: string
          last_name?: string | null
          phone?: string | null
          source?: string | null
          title?: string | null
          updated_at?: string
          workspace_id: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          email?: string | null
          first_name?: string
          id?: string
          last_name?: string | null
          phone?: string | null
          source?: string | null
          title?: string | null
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contacts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contacts_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      content_items: {
        Row: {
          body: string | null
          channel: string | null
          created_at: string
          created_by: string | null
          id: string
          scheduled_at: string | null
          status: string
          title: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          body?: string | null
          channel?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          scheduled_at?: string | null
          status?: string
          title: string
          updated_at?: string
          workspace_id: string
        }
        Update: {
          body?: string | null
          channel?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          scheduled_at?: string | null
          status?: string
          title?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_items_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      deals: {
        Row: {
          amount: number
          company_id: string | null
          contact_id: string | null
          created_at: string
          currency: string
          expected_close_date: string | null
          id: string
          name: string
          stage: Database["public"]["Enums"]["deal_stage"]
          updated_at: string
          workspace_id: string
        }
        Insert: {
          amount?: number
          company_id?: string | null
          contact_id?: string | null
          created_at?: string
          currency?: string
          expected_close_date?: string | null
          id?: string
          name: string
          stage?: Database["public"]["Enums"]["deal_stage"]
          updated_at?: string
          workspace_id: string
        }
        Update: {
          amount?: number
          company_id?: string | null
          contact_id?: string | null
          created_at?: string
          currency?: string
          expected_close_date?: string | null
          id?: string
          name?: string
          stage?: Database["public"]["Enums"]["deal_stage"]
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "deals_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      keywords: {
        Row: {
          created_at: string
          difficulty: number | null
          id: string
          keyword: string
          search_volume: number | null
          target_url: string | null
          workspace_id: string
        }
        Insert: {
          created_at?: string
          difficulty?: number | null
          id?: string
          keyword: string
          search_volume?: number | null
          target_url?: string | null
          workspace_id: string
        }
        Update: {
          created_at?: string
          difficulty?: number | null
          id?: string
          keyword?: string
          search_volume?: number | null
          target_url?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "keywords_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_segments: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          filters: Json
          id: string
          name: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          filters?: Json
          id?: string
          name: string
          updated_at?: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          filters?: Json
          id?: string
          name?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_segments_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          company: string
          created_at: string
          created_by: string | null
          email: string | null
          id: string
          industry: string | null
          name: string
          notes: string | null
          score: number
          source: string | null
          status: Database["public"]["Enums"]["lead_status"]
          updated_at: string
          workspace_id: string
        }
        Insert: {
          company: string
          created_at?: string
          created_by?: string | null
          email?: string | null
          id?: string
          industry?: string | null
          name: string
          notes?: string | null
          score?: number
          source?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          updated_at?: string
          workspace_id: string
        }
        Update: {
          company?: string
          created_at?: string
          created_by?: string | null
          email?: string | null
          id?: string
          industry?: string | null
          name?: string
          notes?: string | null
          score?: number
          source?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      market_reports: {
        Row: {
          created_by: string | null
          generated_at: string
          id: string
          payload: Json
          report_type: string
          title: string
          workspace_id: string
        }
        Insert: {
          created_by?: string | null
          generated_at?: string
          id?: string
          payload?: Json
          report_type: string
          title: string
          workspace_id: string
        }
        Update: {
          created_by?: string | null
          generated_at?: string
          id?: string
          payload?: Json
          report_type?: string
          title?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "market_reports_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      memberships: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["workspace_role"]
          user_id: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["workspace_role"]
          user_id: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["workspace_role"]
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "memberships_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      outreach_drafts: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          body: string
          created_at: string
          created_by: string | null
          id: string
          lead_id: string
          status: string
          subject: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          body: string
          created_at?: string
          created_by?: string | null
          id?: string
          lead_id: string
          status?: string
          subject: string
          updated_at?: string
          workspace_id: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          body?: string
          created_at?: string
          created_by?: string | null
          id?: string
          lead_id?: string
          status?: string
          subject?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "outreach_drafts_lead_workspace_fk"
            columns: ["lead_id", "workspace_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id", "workspace_id"]
          },
          {
            foreignKeyName: "outreach_drafts_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_path: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_path?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_path?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      provider_connections: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          display_name: string
          enabled: boolean
          endpoint: string | null
          id: string
          model: string | null
          provider: string
          settings: Json
          status: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          category: string
          created_at?: string
          created_by?: string | null
          display_name: string
          enabled?: boolean
          endpoint?: string | null
          id?: string
          model?: string | null
          provider: string
          settings?: Json
          status?: string
          updated_at?: string
          workspace_id: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          display_name?: string
          enabled?: boolean
          endpoint?: string | null
          id?: string
          model?: string | null
          provider?: string
          settings?: Json
          status?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "provider_connections_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_preferences: {
        Row: {
          locale: string
          notification_preferences: Json
          timezone: string
          updated_at: string
          updated_by: string | null
          workspace_id: string
        }
        Insert: {
          locale?: string
          notification_preferences?: Json
          timezone?: string
          updated_at?: string
          updated_by?: string | null
          workspace_id: string
        }
        Update: {
          locale?: string
          notification_preferences?: Json
          timezone?: string
          updated_at?: string
          updated_by?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_preferences_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: true
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspaces: {
        Row: {
          created_at: string
          created_by: string
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      campaign_status:
        | "DRAFT"
        | "SCHEDULED"
        | "ACTIVE"
        | "PAUSED"
        | "COMPLETED"
        | "ARCHIVED"
      deal_stage:
        | "LEAD"
        | "QUALIFICATION"
        | "PROPOSAL"
        | "NEGOTIATION"
        | "WON"
        | "LOST"
      lead_status:
        | "NEW"
        | "QUALIFIED"
        | "CONTACTED"
        | "CONVERTED"
        | "DISQUALIFIED"
      workspace_role: "OWNER" | "ADMIN" | "MEMBER" | "VIEWER"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      campaign_status: [
        "DRAFT",
        "SCHEDULED",
        "ACTIVE",
        "PAUSED",
        "COMPLETED",
        "ARCHIVED",
      ],
      deal_stage: [
        "LEAD",
        "QUALIFICATION",
        "PROPOSAL",
        "NEGOTIATION",
        "WON",
        "LOST",
      ],
      lead_status: [
        "NEW",
        "QUALIFIED",
        "CONTACTED",
        "CONVERTED",
        "DISQUALIFIED",
      ],
      workspace_role: ["OWNER", "ADMIN", "MEMBER", "VIEWER"],
    },
  },
} as const
