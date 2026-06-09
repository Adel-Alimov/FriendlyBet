import { useEffect, useState } from "react";
import { MatchOpen } from "../../components/MatchOpen/MatchOpen";
import { useParams } from "react-router-dom";
import { Match } from "../../types/match";
import { getMatchesById } from "../../services/matches.service";
import styles from "./MatchPage.module.css";

export const MatchPage = () => {
    const { id } = useParams();
    const [match, setMatch] = useState<Match | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const load = async () => {
            const data = await getMatchesById(Number(id));
            if (data) setMatch(data);
        };
        load();
        setLoading(false);
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
        if (match) {
            return <MatchOpen match={match} />;
        } else {
            return "Страница не найдена";
        }
    }
};
