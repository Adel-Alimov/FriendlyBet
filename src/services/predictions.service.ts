import { supabase } from "../lib/supabase";

export let getUserPredictions = async function (userId: string) {
    const { data } = await supabase.from("predictions").select("*").eq("user_id", userId);
    return data;
};

export let getPrediction = async function (userId: string, matchId: number) {
    console.time("prediction");
    const { data } = await supabase
        .from("predictions")
        .select("*")
        .eq("user_id", userId)
        .eq("match_id", matchId);
    console.timeEnd("prediction");
    return data;
};
