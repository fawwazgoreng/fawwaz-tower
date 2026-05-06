CREATE TABLE public.echoes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message     TEXT NOT NULL,
  user_id     UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  name        TEXT DEFAULT 'anonymous',
  floor       INTEGER DEFAULT 0,
  rank        TEXT DEFAULT '★',
  title       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Enable security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ECHOES Table Policies
-- Allow anyone (guest or logged-in) to VIEW all echoes
CREATE POLICY "Anyone can view echoes" 
ON public.echoes FOR SELECT 
TO anon, authenticated 
USING (true);

-- Allow authenticated users to CREATE echoes
CREATE POLICY "Users can create their own echoes" 
ON public.echoes FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- Allow users to UPDATE/DELETE only their own echoes
CREATE POLICY "Users can modify own echoes" 
ON public.echoes FOR ALL 
TO authenticated 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);