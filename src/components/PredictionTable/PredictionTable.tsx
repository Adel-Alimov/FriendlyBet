import { useContext } from "react";
import styles from "./PredictionTable.module.css";
import { UserContext } from "../../context/UserContext";
import { getUserPredictions } from "../../services/predictions.service";
import { getMatches } from "../../services/matches.service";
import { useQuery } from "@tanstack/react-query";

export const PredictionTable = () => {
    const userCtx = useContext(UserContext);

    const { data: predictions, isLoading: predictionsLoading } = useQuery({
        queryKey: ["predictions", userCtx!.user?.id],
        queryFn: () => getUserPredictions(userCtx!.user?.id!),
        enabled: !!userCtx!.user?.id,
    });

    const { data: matches, isLoading: matchesLoading } = useQuery({
        queryKey: ["matches"],
        queryFn: getMatches,
    });

    if (predictionsLoading || matchesLoading) {
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
                <p>Сделано прогнозов: {predictions?.length ?? 0}</p>
                {predictions?.map((predict) => {
                    const match = matches?.find((m) => m.id === predict.match_id);
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
