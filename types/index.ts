export interface Lead {
  id?: string;
  name?: string;
  business_name: string;
  phone?: string;
  email?: string;
  website_url?: string;
  has_website?: boolean;
  instagram_followers?: number;
  linkedin_url?: string;
  google_rating?: number;
  reviews_count?: number;
  lead_score: number;
  status: 'new' | 'enriching' | 'enriched' | 'contacted' | 'following_up' | 'warm' | 'cold' | 'client' | 'closed';
  outreach_channel?: 'email' | 'whatsapp' | 'linkedin';
  follow_up_date?: string;
  notes?: string;
  assigned_to?: string;
  city?: string;
  created_at?: string;
}

export type OutreachStatus = Lead['status'];
