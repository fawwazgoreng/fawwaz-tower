import { supabase } from "@/integrations/supabase/client"

export const signInWithOauth = async (provider: 'google' | 'github') => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })
  if (error) throw error
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const profile = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error?.code === 'PGRST116') return null
  if (error) throw error

  return data
}

export const upsertProfile = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      id:         user.id,
      email:      user.email,
      full_name:  user.user_metadata?.full_name,
      avatar_url: user.user_metadata?.avatar_url,
      provider:   user.app_metadata?.provider,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) throw error
  return data
}