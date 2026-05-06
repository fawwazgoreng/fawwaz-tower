CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email     TEXT  UNIQUE,
  updated_at TIMESTAMPTZ,
  PRIMARY KEY (id)
);

-- Enable Security
ALTER TABLE public.echoes ENABLE ROW LEVEL SECURITY;

-- PROFILES Table Policies
-- Usually, you want profiles to be viewable by everyone too
CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles FOR SELECT 
TO anon, authenticated 
USING (true);

-- Only the owner can edit their profile
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
TO authenticated 
USING (auth.uid() = id);

-- Trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN 
    INSERT INTO public.profiles (id, full_name, email)
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data ->> 'full_name',
        NEW.email
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- The trigger remains the same
CREATE OR REPLACE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();