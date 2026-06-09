import React from "react";
import styles from "./MatchCard.module.css";
import { useNavigate } from "react-router-dom";

interface MatchCardProps {
    id: number;
    date: string;
    time: string;
    team1: string;
    team2: string;
    hasPrediction: boolean;
    predictTeam1: number;
    predictTeam2: number;
}

export const MatchCard = ({
    id,
    date,
    time,
    team1,
    team2,
    hasPrediction,
    predictTeam1,
    predictTeam2,
}: MatchCardProps) => {
    let navigate = useNavigate();
    return (
        <>
            <div className={styles.matchesRow} onClick={() => navigate("/match/" + id)}>
                <div className={styles.date}>
                    <p>{date}</p>
                    <p>{time}</p>
                </div>
                <p>{team1}</p>
                <p>vs</p>
                <p>{team2}</p>
                {hasPrediction ? (
                    <div className={styles.completePredict}>
                        <div className={styles.predict}>
                            <p>Прогноз сделан</p>
                            <div className={styles.result}>
                                <p>{predictTeam1}</p>
                                <p>:</p>
                                <p>{predictTeam2}</p>
                            </div>
                        </div>
                        <p>🔒</p>
                    </div>
                ) : (
                    <div className={styles.doPrediction}>
                        <div className={styles.doPredict}>
                            <p>Сделать прогноз</p>
                        </div>
                        <p>⟩</p>
                    </div>
                )}
            </div>
        </>
    );
};
