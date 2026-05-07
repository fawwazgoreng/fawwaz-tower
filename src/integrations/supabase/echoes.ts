import { supabase } from "@/integrations/supabase/client"
import { CreateEchoType } from "@/types/echo.type"

export const GetAllEchoes = async () => {
    const { data, error } = await supabase
      .from('echoes')
      .select('*')
      .limit(30)
    if (error) throw error
    return data
}

export const CreateEcho = async (echo: CreateEchoType) => {
    const { data, error } = await supabase
      .from('echoes')
      .insert([echo])
      .single()
    if (error) throw error
    return data
}

export const DeleteEcho = async (id: string) => {
    const { data, error } = await supabase
      .from('echoes')
      .delete()
      .eq('id', id)
      .single()
    if (error) throw error
    return data
}

export const UpdateEcho = async (id: string, echo: CreateEchoType) => {
    const { data, error } = await supabase
      .from('echoes')
      .update(echo)
      .eq('id', id)
      .single()
    if (error) throw error
    return data
}

export const GetEchoById = async (id: string) => {
    const { data, error } = await supabase
      .from('echoes')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
}