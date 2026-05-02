import {  useEffect, useState } from "react";
import { Session} from "@supabase/supabase-js";
import { supabaseClient } from "./client";
import { AuthContext } from "./useAuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) : React.ReactNode {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabaseClient.auth.getSession().then(({data: {session}}) => {
            setSession(session);
            setLoading(false);
        });

        const {data: { subscription }} = supabaseClient.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
        return () => {
            subscription.unsubscribe();
        };
    }, [])
    return (
        <AuthContext.Provider value={{ session, user: session?.user ?? null , loading, signOut: () => supabaseClient.auth.signOut().then(() => setSession(null)) }}>
            {children}
        </AuthContext.Provider>
    )
}