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
    const { data: predictions, error } = await supabase
        .from("predictions")
        .select("*")
        .eq("match_id", matchId);

    if (error || !predictions) {
        console.log(error);
        return;
    }

    const getPoints = (predict: Prediction, team1_result: number, team2_result: number) => {
        // Точный счет
        if (predict.team1_score === team1_result && predict.team2_score === team2_result) {
            return 3;
        }

        // Победа первой команды
        if (predict.team1_score > predict.team2_score && team1_result > team2_result) {
            return 1;
        }

        // Победа второй команды
        if (predict.team1_score < predict.team2_score && team1_result < team2_result) {
            return 1;
        }

        // Ничья
        if (predict.team1_score === predict.team2_score && team1_result === team2_result) {
            return 1;
        }

        return 0;
    };

    await Promise.all(
        predictions.map(async (predict) => {
            const points = getPoints(predict, team1_result, team2_result);

            console.log("user:", predict.user_id, "points:", points);

            const { data: userData, error: userError } = await supabase
                .from("users")
                .select("*")
                .eq("id", predict.user_id);

            console.log("userData", userData);
            console.log("userError", userError);

            if (!userData || userData.length === 0) {
                console.log("Пользователь не найден");
                return;
            }

            const currentScore = userData[0].score;

            await supabase
                .from("users")
                .update({
                    score: currentScore + points,
                })
                .eq("id", predict.user_id);
        }),
    );
};
