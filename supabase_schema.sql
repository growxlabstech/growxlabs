-- 0. LEADS TABLE (CRM)
CREATE TABLE IF NOT EXISTS leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    business_name TEXT,
    name TEXT,
    email TEXT,
    phone TEXT,
    website_url TEXT,
    has_website BOOLEAN DEFAULT FALSE,
    instagram_followers INTEGER DEFAULT 0,
    linkedin_url TEXT,
    google_rating DECIMAL DEFAULT 0,
    lead_score INTEGER DEFAULT 0,
    status TEXT DEFAULT 'new',
    city TEXT,
    notes TEXT,
    assigned_to UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ENUMS
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('CLIENT', 'ADMIN', 'CO_ADMIN');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 1. CLIENTS TABLE (AUTH/PROFILES)
-- Note: Reusing the 'clients' name for our partnership-level data
CREATE TABLE IF NOT EXISTS clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    business_name TEXT,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    password_hash TEXT NOT NULL,
    role user_role DEFAULT 'CLIENT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. AGREEMENTS TABLE
CREATE TABLE IF NOT EXISTS agreements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    service_type TEXT NOT NULL,
    project_description TEXT,
    total_amount DECIMAL(12, 2) NOT NULL,
    advance_amount DECIMAL(12, 2) NOT NULL,
    balance_amount DECIMAL(12, 2) NOT NULL,
    start_date DATE,
    delivery_date DATE,
    status TEXT DEFAULT 'draft',
    pdf_url TEXT,
    signed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. INVOICES TABLE
CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    agreement_id UUID REFERENCES agreements(id) ON DELETE SET NULL,
    amount DECIMAL(12, 2) NOT NULL,
    advance_paid BOOLEAN DEFAULT FALSE,
    balance_due DECIMAL(12, 2) NOT NULL,
    status TEXT DEFAULT 'pending',
    razorpay_order_id TEXT,
    payment_id TEXT,
    pdf_url TEXT,
    due_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    progress INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_leads_score ON leads(lead_score DESC);
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_agreements_client ON agreements(client_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);

-- RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE agreements ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- ADMIN POLICIES
CREATE POLICY admin_leads ON leads FOR ALL USING (auth.jwt() ->> 'role' IN ('ADMIN', 'CO_ADMIN'));
CREATE POLICY admin_clients ON clients FOR ALL USING (auth.jwt() ->> 'role' IN ('ADMIN', 'CO_ADMIN'));
CREATE POLICY admin_agreements ON agreements FOR ALL USING (auth.jwt() ->> 'role' IN ('ADMIN', 'CO_ADMIN'));
CREATE POLICY admin_invoices ON invoices FOR ALL USING (auth.jwt() ->> 'role' IN ('ADMIN', 'CO_ADMIN'));
CREATE POLICY admin_projects ON projects FOR ALL USING (auth.jwt() ->> 'role' IN ('ADMIN', 'CO_ADMIN'));
