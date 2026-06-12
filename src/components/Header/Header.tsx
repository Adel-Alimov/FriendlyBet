import styles from "./Header.module.css";
import ball from "../../assets/ball.png";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { supabase } from "../../lib/supabase";

export const Header = () => {
    const userCtx = useContext(UserContext)!;
    const navigate = useNavigate();

    const handleSignOut = async function () {
        await supabase.auth.signOut();
        userCtx.setUser(null);
        navigate("/login");
    };

    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <img src={ball} alt="футбольный мяч" className={styles.ball} />
                <h2>Friendly Bet</h2>

                <nav>
                    {/* <input type="checkbox" id="burgerToggle" />
                    <label htmlFor="burgerToggle">
                        <span></span>
                    </label> */}
                    <ul
                        style={{
                            listStyle: "none",
                            border: "none",
                            display: "flex",
                            gap: "30px",
                            marginLeft: "40px",
                            alignItems: "center",
                        }}
                    >
                        <li>
                            <NavLink
                                className={({ isActive }) => (isActive ? styles.active : "")}
                                to="/"
                            >
                                Главная
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) => (isActive ? styles.active : "")}
                                to="/matches"
                            >
                                Матчи
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) => (isActive ? styles.active : "")}
                                to="/my-predictions"
                            >
                                Прогнозы
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) => (isActive ? styles.active : "")}
                                to="/ranking"
                            >
                                Рейтинг
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) => (isActive ? styles.active : "")}
                                to="/rules"
                            >
                                Правила
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <div className={styles.user}>
                    <p>{userCtx.user?.name}</p>
                    <button onClick={handleSignOut}>Выйти</button>
                </div>
            </div>
        </div>
    );
};
