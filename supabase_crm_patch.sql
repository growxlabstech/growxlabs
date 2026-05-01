-- TEAM MEMBERS
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  role TEXT DEFAULT 'crm_agent',
  password_hash TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  accepted_terms BOOLEAN DEFAULT FALSE,
  accepted_terms_at TIMESTAMPTZ,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- LOGIN SESSIONS
CREATE TABLE IF NOT EXISTS team_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_member_id UUID REFERENCES team_members(id),
  login_at TIMESTAMPTZ DEFAULT NOW(),
  logout_at TIMESTAMPTZ,
  ip_address TEXT,
  device TEXT,
  browser TEXT,
  is_active BOOLEAN DEFAULT TRUE
);

-- CRM LEADS
CREATE TABLE IF NOT EXISTS crm_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  city TEXT,
  state TEXT,
  business_type TEXT,
  source TEXT,
  source_tool TEXT,
  source_url TEXT,
  website_url TEXT,
  instagram_url TEXT,
  linkedin_url TEXT,
  has_website BOOLEAN,
  score INTEGER DEFAULT 0,
  status TEXT DEFAULT 'new',
  priority TEXT DEFAULT 'medium',
  assigned_to UUID REFERENCES team_members(id),
  notes TEXT,
  last_contacted_at TIMESTAMPTZ,
  next_followup_at TIMESTAMPTZ,
  deal_value DECIMAL(10,2),
  tags TEXT[] DEFAULT '{}',
  custom_fields JSONB DEFAULT '{}',
  added_manually BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES team_members(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- LEAD ACTIVITIES
CREATE TABLE IF NOT EXISTS lead_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES crm_leads(id),
  team_member_id UUID REFERENCES team_members(id),
  activity_type TEXT,
  notes TEXT,
  outcome TEXT,
  next_action TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TERMS AND CONDITIONS
CREATE TABLE IF NOT EXISTS terms_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version TEXT NOT NULL,
  content TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- DEFAULT ROW LEVEL SECURITY
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE terms_versions ENABLE ROW LEVEL SECURITY;

-- Allow read/write for anon and authenticated (if using custom auth via API routes)
-- We will handle auth entirely through the Next.js API layer using service_role keys.
-- So we can create a policy to allow all for now, OR bypass RLS in the API.
-- Bypassing RLS via service_role key in the backend is safer for custom auth tables.
