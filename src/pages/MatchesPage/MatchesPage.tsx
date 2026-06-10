import { useContext } from "react";
import { getMatches } from "../../services/matches.service";
import styles from "./MatchesPage.module.css";
import { MatchCard } from "../../components/MatchCard/MatchCard";
import { getUserPredictions } from "../../services/predictions.service";
import { UserContext } from "../../context/UserContext";
import { Header } from "../../components/Header/Header";
import { useQuery } from "@tanstack/react-query";

export const MatchesPage = () => {
    const userCtx = useContext(UserContext)!;

    const { data: predictions, isLoading: predictionsLoading } = useQuery({
        queryKey: ["predictions", userCtx!.user?.id],
        queryFn: () => getUserPredictions(userCtx!.user?.id!),
        enabled: !!userCtx!.user?.id,
    });

    const { data: matches, isLoading: matchesLoading } = useQuery({
        queryKey: ["matches"],
        queryFn: getMatches,
    });

    if (matchesLoading || predictionsLoading) {
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
                <Header />
                {(matches ?? []).map((match) => {
                    const prediction = (predictions ?? []).find(
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
