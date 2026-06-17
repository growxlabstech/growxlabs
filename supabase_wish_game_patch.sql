-- =======================================================
-- ONE WISH WILLOW - COMPLETE DATABASE SCHEMA PATCH
-- =======================================================

-- 1. WISH GAME SUBSCRIBERS TABLE
-- Stores the users who entered the game (name, email)
CREATE TABLE IF NOT EXISTS public.wish_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. WISH GAME ENTRIES TABLE
-- Stores wishes made and their generated consequences, linked to the subscriber
CREATE TABLE IF NOT EXISTS public.wishes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL REFERENCES public.wish_subscribers(email) ON DELETE CASCADE,
  wish TEXT NOT NULL,
  consequence TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ROW LEVEL SECURITY (RLS)
-- Enable RLS on both tables
ALTER TABLE public.wish_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;

-- Note: The Next.js API route uses the Supabase service_role key (supabaseAdmin),
-- which bypasses RLS policies automatically. If you ever use client-side direct inserts,
-- you can add policies like:
-- CREATE POLICY "Allow public inserts" ON public.wish_subscribers FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Allow public inserts" ON public.wishes FOR INSERT WITH CHECK (true);
