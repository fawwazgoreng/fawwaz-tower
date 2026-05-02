import { createClient } from "@supabase/supabase-js";
import env from "@/config/config";

const SUPABASE_URL = env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = env.VITE_SUPABASE_ANON_KEY;

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        storage: localStorage,
        persistSession: true,
        autoRefreshToken: true,
        flowType: "pkce"
    },
    global: {
        headers: {
            "x-app-version": '1.0.0'
        }
    }
});
