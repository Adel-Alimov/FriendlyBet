import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = "https://fefbncnraxihyfnuxzax.supabase.co";
const SUPABASE_KEY = "sb_publishable_cT3fsY9kgPbegT49SsXquw_AAcNXnYR";
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
