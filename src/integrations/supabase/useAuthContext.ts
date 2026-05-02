import { createContext, useContext } from "react";
import { Session, User } from "@supabase/supabase-js";

export type authContextType = {
    session: Session | null,
    user: User | null,
    loading: boolean,
    signOut: () => void,
}
export const AuthContext = createContext<authContextType | undefined>(undefined);

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
    return ctx;
}