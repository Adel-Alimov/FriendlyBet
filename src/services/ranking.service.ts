import { supabase } from "../lib/supabase";
import { Prediction } from "../types/prediction";

export const getRanking = async function () {
    const { data } = await supabase.from("users").select("*").order("score", { ascending: false });
    return data;
};

export const calculateScores = async function (
    matchId: number,
    team1_result: number,
    team2_result: number,
) {
    const { data } = await supabase.from("predictions").select("*").eq("match_id", matchId);

    const getPoints = (predict: Prediction, team1_result: number, team2_result: number) => {
        if (predict.team1_score === team1_result && predict.team2_score === team2_result) {
            return 3;
        } else if (predict.team1_score > predict.team2_score && team1_result > team2_result) {
            return 1;
        } else if (predict.team1_score < predict.team2_score && team1_result < team2_result) {
            return 1;
        } else if (predict.team1_score === predict.team2_score && team1_result === team2_result) {
            return 1;
        } else {
            return 0;
        }
    };

    for (const predict of data ?? []) {
        const points = getPoints(predict, team1_result, team2_result);
        const { data: userData } = await supabase
            .from("users")
            .select("*")
            .eq("id", predict.user_id);
        let currentScore = userData![0].score;
        currentScore += points;
        await supabase.from("users").update({ score: currentScore }).eq("id", predict.user_id);
    }
};
