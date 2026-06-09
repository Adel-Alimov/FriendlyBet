import React, { useState } from "react";
import styles from "./Login.module.css";
import { signIn } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();
    const [result, setResult] = useState({
        login: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const handleSubmit = async function () {
        const { data, error } = await signIn(result.login, result.password);
        if (error) {
            setErrorMessage(error.message);
        } else {
            navigate("/");
        }
    };
    return (
        <>
            <div className={styles.container}>
                <div className={styles.card}>
                    <h4>Вход</h4>
                    <div className={styles.inputs}>
                        <input
                            type="text"
                            placeholder="Email"
                            className={styles.input}
                            style={{ marginBottom: "30px" }}
                            onChange={(e) => {
                                setResult({ ...result, login: e.target.value });
                            }}
                        />
                        <input
                            type="password"
                            onChange={(e) => {
                                setResult({ ...result, password: e.target.value });
                            }}
                            className={styles.input}
                            placeholder="Пароль"
                        />
                    </div>
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                    <button className={styles.button} onClick={handleSubmit}>
                        <span>Войти</span>
                    </button>
                </div>
            </div>
        </>
    );
};
