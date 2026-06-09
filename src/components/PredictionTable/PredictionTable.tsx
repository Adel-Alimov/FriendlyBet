import React, { useContext, useEffect, useState } from "react";
import styles from "./PredictionTable.module.css";
import { Prediction } from "../../types/prediction";
import { UserContext } from "../../context/UserContext";
import { getUserPredictions } from "../../services/predictions.service";
import { Match } from "../../types/match";
import { getMatches } from "../../services/matches.service";

export const PredictionTable = () => {
    const userCtx = useContext(UserContext);
    const [prediction, setPrediction] = useState<Prediction[] | null>(null);
    const [mathes, setMatches] = useState<Match[] | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const load = async () => {
            if (userCtx?.user?.id) {
                const data = await getUserPredictions(userCtx.user?.id!);
                const match = await getMatches();
                setPrediction(data);
                setMatches(match);
                setLoading(false);
            }
        };
        load();
    }, [userCtx?.user]);
    if (loading) {
        return (
            <>
                <div className={styles.loader}>
                    <div className={styles.bar1}></div>
                    <div className={styles.bar2}></div>
                    <div className={styles.bar3}></div>
                    <div className={styles.bar4}></div>
                    <div className={styles.bar5}></div>
                    <div className={styles.bar6}></div>
                    <div className={styles.bar7}></div>
                    <div className={styles.bar8}></div>
                    <div className={styles.bar9}></div>
                    <div className={styles.bar10}></div>
                    <div className={styles.bar11}></div>
                    <div className={styles.bar12}></div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <p>Сделано прогнозов: {prediction?.length ?? 0}</p>
                {prediction?.map((predict) => {
                    const match = mathes?.find((m) => m.id === predict.match_id);
                    return (
                        <div key={predict.match_id} className={styles.prediction}>
                            <p>
                                {match?.team1} vs {match?.team2}
                            </p>
                            <p>
                                {predict.team1_score} : {predict.team2_score}
                            </p>
                        </div>
                    );
                })}
            </>
        );
    }
};
