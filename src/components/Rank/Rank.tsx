import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { getRanking } from "../../services/ranking.service";
import { User } from "../../types/user";
import styles from "./Rank.module.css";

export const Rank = () => {
    const userCtx = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [rank, setRank] = useState<User[] | null>(null);
    useEffect(() => {
        const load = async () => {
            const data = await getRanking();
            if (data) setRank(data);
            setLoading(false);
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
                <div>
                    {rank?.map((user, index) => (
                        <div key={user.id} className={styles.rank}>
                            <p>{index + 1}</p>
                            <p>{user.name}</p>
                            <p>{user.score}</p>
                        </div>
                    ))}
                </div>
            </>
        );
    }
};
