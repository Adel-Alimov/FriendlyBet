import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Register.module.css";
import { signUp } from "../../services/auth.service";

export const Register = () => {
    const navigate = useNavigate();
    const [result, setResult] = useState({
        login: "",
        password: "",
        name: "",
        surname: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const handleSubmit = async function () {
        const { error } = await signUp(result.login, result.password, {
            data: {
                person: result.name,
                surname: result.surname,
            },
        });
        if (error) {
            setErrorMessage(error.message);
        } else {
            navigate("/login");
        }
    };
    return (
        <>
            <div className={styles.container}>
                <div className={styles.card}>
                    <h4>Регистрация</h4>
                    <div className={styles.inputs}>
                        <input
                            type="text"
                            placeholder="Имя"
                            className={styles.input}
                            onChange={(e) => {
                                setResult({ ...result, name: e.target.value });
                            }}
                        />
                        <input
                            type="text"
                            onChange={(e) => {
                                setResult({ ...result, surname: e.target.value });
                            }}
                            className={styles.input}
                            placeholder="Фамилия"
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            className={styles.input}
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
                        <span>Регистрация</span>
                    </button>
                </div>
            </div>
        </>
    );
};
