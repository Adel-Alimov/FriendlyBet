import { useContext } from "react";
import worldCup from "../../assets/wc.png";
import styles from "./MatchHero.module.css";
import trophy from "../../assets/trophy.png";
import { MatchCard } from "../MatchCard/MatchCard";
import { getUserPredictions } from "../../services/predictions.service";
import { UserContext } from "../../context/UserContext";
import { getMatches } from "../../services/matches.service";
import { getRanking } from "../../services/ranking.service";
import { useQuery } from "@tanstack/react-query";

export const MatchHero = () => {
    const userCtx = useContext(UserContext)!;

    const { data: matches, isLoading: matchesLoading } = useQuery({
        queryKey: ["matches"],
        queryFn: getMatches,
    });

    const { data: rank } = useQuery({
        queryKey: ["ranking"],
        queryFn: getRanking,
    });

    const { data: predictions, isLoading: predictionsLoading } = useQuery({
        queryKey: ["predictions", userCtx.user?.id],
        queryFn: () => getUserPredictions(userCtx.user?.id!),
        enabled: !!userCtx.user?.id,
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
                <div className={styles.img}>
                    <img src={worldCup} alt="Кубок мира" />
                </div>
                <div className={styles.posAbsolute}>
                    <h1>ЧЕМПИОНАТ МИРА</h1>
                    <h1>ПО ФУТБОЛУ</h1>
                    <h1 style={{ fontSize: "10vw" }}>2026</h1>
                </div>
                <div className={styles.center}>
                    <div className={styles.left}>
                        <div className={styles.tour}>
                            <h2>ГРУППОВОЙ ЭТАП</h2>
                            <p>11-28 июня 2026</p>
                            <div className={styles.tourBlock}>
                                <p>Групповой этап начнется завтра</p>
                                {/* <p style={{ fontSize: "1.5vw" }}>02дня 14ч 36мин 58сек</p> */}
                            </div>
                        </div>
                        <div className={styles.match}>
                            <h2>Матчи тура</h2>
                            <div className={styles.buttons}>
                                {/* <button className={styles.active}>Все матчи</button>
                                <button>Мои прогнозы</button>
                                <button>Сделать прогноз</button> */}
                            </div>
                            <div className={styles.matches}>
                                {(matches ?? []).map((match) => {
                                    const prediction = predictions?.find(
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
                                            predictTeam1={prediction?.team1_score ?? 0}
                                            predictTeam2={prediction?.team2_score ?? 0}
                                        />
                                    );
                                })}
                            </div>
                            <div className={styles.button}>
                                {/* <button className={styles.tableButton}>Смотреть все матчи</button> */}
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.aboutTour}>
                            <div className={styles.tourLeft}>
                                <h2>О ТУРЕ</h2>
                                <p>
                                    Сделайте прогнозы на все матчи тура. За каждый угаданный исход
                                    <b> 1 балл</b>, За точный счет <b>3 балла</b>
                                </p>
                                <p>Итоги буду подведены после завершения всех матчей</p>
                            </div>
                            <div className={styles.tourRight}>
                                <img src={trophy} alt="Кубок" />
                            </div>
                        </div>
                        <div className={styles.tourTable}>
                            <h2>Турнирная таблица</h2>
                            <div className={styles.table}>
                                {rank?.map((user, index) => (
                                    <div key={user.id} className={styles.rank}>
                                        <p>{index + 1}</p>
                                        <p>{user.name}</p>
                                        <p>{user.score}</p>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.button}>
                                {/* <button className={styles.tableButton}>
                                    Смотреть полный список
                                </button> */}
                            </div>
                        </div>
                        {/* <div className={styles.prediction}>
                            <h2>Мои прогнозы</h2>
                            <div className={styles.myPrediction}>
                                <p>Сделано прогнозов</p>
                                <p>1</p>
                            </div>
                            <div className={styles.myPrediction}>
                                <p>Возможное количество очков</p>
                                <p>18</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </>
        );
    }
};
