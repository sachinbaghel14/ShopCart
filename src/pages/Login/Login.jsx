import { useState } from "react"
import styles from "./login.module.css"
import { Header } from "../../shared/Header/Header"
import { Footer } from "../../shared/Footer/Footer"
import { useNavigate } from "react-router-dom"
import { addUser } from "../../store/slices/cartSlices"
import { useDispatch } from "react-redux"
import { useFormik } from "formik"
import { Form } from "react-bootstrap"
import * as Yup from "yup"

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('email type invalid')
        .required('Email is required'),

    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password cannot be less than 6 characters')
        .max(15, 'Password is too long!'),

})

export function Login() {
    const [user, setUser] = useState({ email: "", password: "" })
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: user,
        onSubmit: handleLogin,
        validationSchema: LoginSchema,

    });

    function handleLogin(values) {
        fetch('https://fakestoreapi.com/auth/login', {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                console.log(response.json())
                console.log("user is logged in")
                const userDetails = localStorage.getItem('userDetails')
                if (userDetails) {
                    var arrayOfItems = JSON.parse(userDetails)
                    const itemAreadyExistsIndex = arrayOfItems.findIndex(
                        (i) => i.email === values.email,
                    )
                    if (itemAreadyExistsIndex !== -1) {
                        if (arrayOfItems[itemAreadyExistsIndex].password === values.password) {
                            arrayOfItems[itemAreadyExistsIndex].loggedin = true
                            localStorage.setItem('userDetails', JSON.stringify(arrayOfItems));
                            console.log("user found")
                            dispatch(addUser(arrayOfItems[itemAreadyExistsIndex]))
                            navigate('/')
                        } else {
                            alert("invalid email or password")
                        }
                    } else {
                        alert("invalid email or password")
                    }

                }else{
                    alert("invalid email or password")
                }

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
                    <Form noValidate className="loginform" onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3" controlId="validationCustomUsername">
                            <Form.Label className={styles.formLabel}>
                                Email address
                            </Form.Label>
                            <Form.Control
                                value={formik.values.email}
                                type="email"
                                name="email"
                                className={`form-control ${styles.formInput}`}
                                placeholder="Your email"
                                onChange={formik.handleChange}
                                isValid={formik.touched.email && !formik.errors.email}
                                isInvalid={!!formik.errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="validationCustomPassword">
                            <Form.Label className={styles.formLabel}>
                                Password
                            </Form.Label>
                            <Form.Control
                                value={formik.values.password}
                                type="password"
                                name="password"
                                className={`form-control ${styles.formInput}`}
                                placeholder="Your password"
                                onChange={formik.handleChange}
                                isValid={formik.touched.password && !formik.errors.password}
                                isInvalid={!!formik.errors.password}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <div class="mb-3 d-flex flex-wrap justify-content-between">
                            <div class="form-check mb-2">
                                <input class={`form-check-input ${styles.rememberCheck}`} type="checkbox" id="si-remember"></input>
                                <label class="form-check-label" for="si-remember">Remember me</label>
                            </div><a class={`fs-sm ${styles.forget}`} href="#">Forgot password?</a>
                        </div>
                        <button type="submit" className={`btn ${styles.loginBtn}`}>Signin</button>
                    </Form>
                    <h6>New to ShopCart?</h6>
                    <button type="button" className={`btn ${styles.signupBtn}`} onClick={() => (navigate("/signup"))}>Create your ShopCart account</button>
                </div>

            </div>
            <Footer></Footer>
        </div>

    )
}