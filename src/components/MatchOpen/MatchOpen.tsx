import React, { useContext, useEffect, useState } from "react";
import styles from "./MatchOpen.module.css";
import { Match } from "../../types/match";
import { UserContext } from "../../context/UserContext";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
import { getPrediction } from "../../services/predictions.service";

interface MatchProps {
    match: Match;
}

export const MatchOpen = ({ match }: MatchProps) => {
    const navigate = useNavigate();
    const [prediction, setPrediction] = useState({
        team1: 0,
        team2: 0,
    });
    const [doPredict, setDoPredict] = useState(false);
    const [loading, setLoading] = useState(true);
    const userCtx = useContext(UserContext)!;
    useEffect(() => {
        const load = async () => {
            const predict = await getPrediction(userCtx.user?.id!, match.id);
            if (predict && predict.length > 0) setDoPredict(true);
            setLoading(false);
        };
        load();
    }, [userCtx.user?.id]);
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
    } else if (doPredict) {
        return <h1 style={{ color: "black", textAlign: "center" }}>Прогноз уже сделан</h1>;
    } else {
        return (
            <>
                <div className={styles.container}>
                    <div className={styles.head}>
                        <h2>{match.team1}</h2>
                        <h2>VS</h2>
                        <h2>{match.team2}</h2>
                    </div>
                    <div className={styles.main}>
                        <h2>{match.date}</h2>
                        <h2>{match.time}</h2>
                    </div>
                    <div className={styles.bottom}>
                        <h2>Ваш прогноз</h2>
                        <div className={styles.inputs}>
                            <input
                                type="number"
                                min={0}
                                onChange={(e) =>
                                    setPrediction({ ...prediction, team1: Number(e.target.value) })
                                }
                            ></input>
                            <h2>:</h2>
                            <input
                                type="number"
                                min={0}
                                onChange={(e) =>
                                    setPrediction({ ...prediction, team2: Number(e.target.value) })
                                }
                            ></input>
                        </div>
                        <button
                            onClick={async () => {
                                const { data, error } = await supabase
                                    .from("predictions")
                                    .insert({
                                        user_id: userCtx.user?.id,
                                        match_id: match.id,
                                        team1_score: prediction.team1,
                                        team2_score: prediction.team2,
                                    })
                                    .select();
                                if (error == null) {
                                    navigate("/");
                                }
                                console.log("DATA:", data);
                                console.log("ERROR:", error);
                            }}
                        >
                            Сохранить прогноз
                        </button>
                    </div>
                </div>
            </>
        );
    }
};
