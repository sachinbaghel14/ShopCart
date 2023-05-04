import { useState } from "react"
import styles from "./login.module.css"
import { Header } from "../../shared/Header/Header"
import { Footer } from "../../shared/Footer/Footer"
import { useNavigate } from "react-router-dom"

export function Login() {
    const [user, setUser] = useState({email: "", password: "" })
    const navigate = useNavigate();

    function handleLogin() {
        console.log(user)
        fetch('https://fakestoreapi.com/auth/login', {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                console.log(response.json())
                console.log("user is logged in")
                navigate('/')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (

        <div>
            <Header></Header>
            <div className={styles.container}>
                {/* 1 row is divided in 12 columns. */}
                <div className={styles.loginContainer}>
                    <div className={styles.loginTitle}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="33.6" height="33.6" fill="currentColor" class="bi bi-unlock" viewBox="0 0 16 16">
                                <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z" />
                            </svg>
                        </div>
                        <div className={styles.loginTitleH3}><h3>Sign in</h3></div>

                    </div>
                    <hr></hr>
                    <form className="loginform">
                        <div className="mb-3">
                            <label for="email" className={styles.formLabel}>
                                Email address
                            </label>
                            <input
                                value={user.email}
                                type="email"
                                className={`form-control ${styles.formInput}`}
                                id="email"
                                placeholder="Your email"
                                onInput={(event) => {
                                    setUser({ ...user, email: event.target.value })
                                }}>
                            </input>
                        </div>
                        <div className="mb-3">
                            <label for="password" className={styles.formLabel}>
                                Password
                            </label>
                            <input
                                type="password" onInput={(event) => {
                                    setUser({ ...user, password: event.target.value })
                                }}
                                value={user.password}
                                className={`form-control ${styles.formInput}`}
                                id="password"
                                placeholder="Your password"
                            ></input>
                        </div>
                        <div class="mb-3 d-flex flex-wrap justify-content-between">
                            <div class="form-check mb-2">
                                <input class={`form-check-input ${styles.rememberCheck}`} type="checkbox" id="si-remember"></input>
                                <label class="form-check-label" for="si-remember">Remember me</label>
                            </div><a class={`fs-sm ${styles.forget}`} href="#">Forgot password?</a>
                        </div>
                        <button onClick={handleLogin} type="button" className={`btn ${styles.loginBtn}`}>Signin</button>
                    </form>
                    <h6>New to ShopCart?</h6>
                    <button type="button" className={`btn ${styles.signupBtn}`} onClick={() => (navigate("/signup"))}>Create your ShopCart account</button>
                </div>

            </div>
            <Footer></Footer>
        </div>

    )
}