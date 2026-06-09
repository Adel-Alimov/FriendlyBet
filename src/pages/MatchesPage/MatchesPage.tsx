import { useState, useEffect, useContext } from "react";
import { getMatches } from "../../services/matches.service";
import { Match } from "../../types/match";
import styles from "./MatchesPage.module.css";
import { MatchCard } from "../../components/MatchCard/MatchCard";
import { getUserPredictions } from "../../services/predictions.service";
import { Prediction } from "../../types/prediction";
import { UserContext } from "../../context/UserContext";

export const MatchesPage = () => {
    const userCtx = useContext(UserContext)!;
    const [loading, setLoading] = useState(true);
    const [matches, setMatches] = useState<Match[]>([]);

    const [predictions, setPredictions] = useState<Prediction[]>([]);

    useEffect(() => {
        const load = async () => {
            if (userCtx.user?.id) {
                const data = await getUserPredictions(userCtx.user.id);
                const match = await getMatches();
                if (data) setPredictions(data);
                if (match) setMatches(match);
            }
            setLoading(false);
        };
        load();
    }, []);
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
                {matches.map((match) => {
                    const prediction = predictions.find(
                        (prediction) => match.id === prediction.match_id,
                    );
                    return (
                        <MatchCard
                            key={match.id}
                            id={match.id}
                            date={match.date}
                            time={match.time}
                            team1={match.team1}
                            team2={match.team2}
                            hasPrediction={prediction ? true : false}
                            predictTeam1={prediction?.team1_score!}
                            predictTeam2={prediction?.team2_score!}
                        />
                    );
                })}
            </>
        );
    }
};
