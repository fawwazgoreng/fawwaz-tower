import z from "zod";

const env = z.object({
    VITE_SUPABASE_ANON_KEY: z.url(),
    VITE_SUPABASE_URL: z.string()
});

const parsedEnv = env.safeParse(process.env);

if (parsedEnv.error) {
    console.log("Invalid environment set" + parsedEnv.error.format);
    console.log(parsedEnv.error.message);
    process.exit(1);
}

export default parsedEnv.data;
