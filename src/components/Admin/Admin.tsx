import React, { useEffect, useState } from "react";
import { Match } from "../../types/match";
import { getMatches } from "../../services/matches.service";
import styles from "./Admin.module.css";
import { supabase } from "../../lib/supabase";
import { calculateScores } from "../../services/ranking.service";

export const Admin = () => {
    const [mathes, setMatches] = useState<Match[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState<Record<number, { team1: number; team2: number }>>({});
    useEffect(() => {
        const load = async () => {
            const match = await getMatches();
            if (match) setMatches(match);
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
                {mathes?.map((match) => (
                    <div key={match.id}>
                        <p>
                            {match.team1} vs {match.team2}
                        </p>
                        <div className={styles.inputs}>
                            <input
                                type="number"
                                onChange={(e) => {
                                    setResults({
                                        ...results,
                                        [match.id]: {
                                            ...results[match.id],
                                            team1: Number(e.target.value),
                                        },
                                    });
                                }}
                            />
                            <input
                                type="number"
                                onChange={(e) => {
                                    setResults({
                                        ...results,
                                        [match.id]: {
                                            ...results[match.id],
                                            team2: Number(e.target.value),
                                        },
                                    });
                                }}
                            />
                        </div>
                        <button
                            onClick={async () => {
                                const result = results[match.id];
                                await supabase
                                    .from("matches")
                                    .update({
                                        team1_result: result.team1,
                                        team2_result: result.team2,
                                    })
                                    .eq("id", match.id);

                                await calculateScores(match.id, result.team1, result.team2);
                            }}
                        >
                            Сохранить
                        </button>
                    </div>
                ))}
            </>
        );
    }
};
