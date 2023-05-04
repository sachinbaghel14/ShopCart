import { useState } from "react"
import styles from "./SignUp.module.css"
import { Header } from "../../shared/Header/Header"
import { Footer } from "../../shared/Footer/Footer"
import { useNavigate } from "react-router-dom"


export function SignUp() {

    const [user, setUser] = useState({email: "", name: "", password: "",confirmPassword:"" })
    const navigate = useNavigate();

    function handleSignUp() {
        console.log(user)
        fetch('https://fakestoreapi.com/users', {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                console.log(response.json())
                alert("Signup Successful, Please Signin")
                navigate("/login");
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="33.6" height="33.6" fill="currentColor" class={`bi bi-person ${styles.headerSvg}`} viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                            </svg>
                        </div>
                        <div className={styles.loginTitleH3}><h3>Sign up</h3></div>

                    </div>
                    <hr></hr>
                    <form className="loginform">
                        <div className="mb-3">
                            <label for="name" className={styles.formLabel}>
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={user.name}
                                className={`form-control ${styles.formInput}`}
                                id="name"
                                placeholder="Full Name"
                                onInput={(event) => {
                                    setUser({ ...user, name: event.target.value })
                                }}>
                            </input>
                        </div>
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
                        <div className="mb-3">
                            <label for="confirmPassword" className={styles.formLabel}>
                                Confirm password
                            </label>
                            <input
                                type="password" onInput={(event) => {
                                    setUser({ ...user, confirmPassword: event.target.value })
                                }}
                                value={user.confirmPassword}
                                className={`form-control ${styles.formInput}`}
                                id="confirmPassword"
                                placeholder="Confirm Your password"
                            ></input>
                        </div>
                        <button onClick={handleSignUp} type="button" className={`btn ${styles.loginBtn}`}>Sign up</button>
                    </form>
                    <h6>Already have an account?</h6>
                    <button type="button" className={`btn ${styles.signupBtn}`} onClick={() => (navigate("/login"))}>Sign in</button>
                </div>

            </div>
            <Footer></Footer>
        </div>
    )
}