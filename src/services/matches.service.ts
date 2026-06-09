import { supabase } from "../lib/supabase";

export async function getMatches() {
    const { data } = await supabase.from("matches").select("*").order("id", { ascending: true });
    return data;
}

export async function getMatchesById(id: number) {
    const { data } = await supabase.from("matches").select("*").eq("id", id).single();
    return data;
}
