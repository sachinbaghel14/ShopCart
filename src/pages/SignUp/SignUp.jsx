import { useState } from "react"
import styles from "./SignUp.module.css"
import { Header } from "../../shared/Header/Header"
import { Footer } from "../../shared/Footer/Footer"
import { useNavigate } from "react-router-dom"
import { Form } from "react-bootstrap"
import { useFormik } from "formik";
import * as Yup from "yup"


const SignupSchema = Yup.object().shape({
    firstname: Yup.string()
        .required('First Name is required')
        .min(3, 'First Name cannot be less than 3 characters')
        .max(15, 'First Name is too long!'),

    lastname: Yup.string()
        .required('Last Name is required')
        .min(3, 'Last Name cannot be less than 3 characters')
        .max(15, 'Last Name is too long!'),

    email: Yup.string()
        .email('Email type invalid')
        .required('Email is required'),

    number: Yup.string()
        .required('Phone Number is required')
        .min(10, 'Phone Number cannot be less than 10 characters')
        .max(12, 'Phone Number is too long!'),

    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password cannot be less than 6 characters')
        .max(15, 'Password is too long!'),

    confirmpassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')

})
export function SignUp() {

    const [user, setUser] = useState({ email: "", firstname: "", lastname: "", number: "", password: "", confirmpassword: "" })
    const navigate = useNavigate();
    // console.log(user)

    const formik = useFormik({
        initialValues: user,
        onSubmit: handleSignUp,
        validationSchema: SignupSchema,

    });


    function handleSignUp(values) {
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
                localStorage.setItem('userDetails', JSON.stringify([values]));
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
                    <Form noValidate className="loginform" onSubmit={formik.handleSubmit}>
                        <div className={`mb-3 ${styles.name}`}>
                            <Form.Group controlId="validationFormik01">
                                <Form.Label className={`${styles.formLabel}`}>
                                    First Name
                                </Form.Label>
                                <Form.Control
                                    name="firstname"
                                    type="text"
                                    value={formik.values.firstname}
                                    className={`form-control ${styles.formInput}`}
                                    placeholder="First name"
                                    onChange={formik.handleChange}
                                    isValid={formik.touched.firstname && !formik.errors.firstname}
                                    isInvalid={!!formik.errors.firstname}
                                />
                                <Form.Control.Feedback type="invalid">{formik.errors.firstname}</Form.Control.Feedback>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="validationFormik02">
                                <Form.Label className={`${styles.formLabel}`}>
                                    Last Name
                                </Form.Label>
                                <Form.Control
                                    name="lastname"
                                    type="text"
                                    value={formik.values.lastname}
                                    onChange={formik.handleChange}
                                    className={`form-control ${styles.formInput}`}
                                    placeholder="Last name"
                                    isValid={formik.touched.lastname && !formik.errors.lastname}
                                    isInvalid={!!formik.errors.lastname}
                                />
                                <Form.Control.Feedback type="invalid">{formik.errors.lastname}</Form.Control.Feedback>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <Form.Group className="mb-3" controlId="validationCustomUsername">
                            <Form.Label className={styles.formLabel}>
                                Email address
                            </Form.Label>
                            <Form.Control
                                name="email"
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                className={`form-control ${styles.formInput}`}
                                placeholder="Your email"
                                isValid={formik.touched.email && !formik.errors.email}
                                isInvalid={!!formik.errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="validationCustomUsername">
                            <Form.Label className={styles.formLabel}>
                                Phone Number
                            </Form.Label>
                            <Form.Control
                                name="number"
                                type="tel"
                                value={formik.values.number}
                                onChange={formik.handleChange}
                                className={`form-control ${styles.formInput}`}
                                placeholder="Your phone number"
                                isValid={formik.touched.number && !formik.errors.number}
                                isInvalid={!!formik.errors.number}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.number}</Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className={styles.formLabel}>
                                Password
                            </Form.Label>
                            <Form.Control
                                name="password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                className={`form-control ${styles.formInput}`}
                                placeholder="Your password"
                                isValid={formik.touched.password && !formik.errors.password}
                                isInvalid={!!formik.errors.password}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className={styles.formLabel}>
                                Confirm password
                            </Form.Label>
                            <Form.Control
                                name="confirmpassword"
                                type="password"
                                // onInput={(event) => {
                                //     setUser({ ...user, confirmpassword: event.target.value })
                                // }}
                                value={formik.values.confirmpassword}
                                onChange={formik.handleChange}
                                className={`form-control ${styles.formInput}`}
                                id="confirmpassword"
                                placeholder="Confirm Your password"
                                isValid={formik.touched.confirmpassword && !formik.errors.confirmpassword}
                                isInvalid={!!formik.errors.confirmpassword}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.confirmpassword}</Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <button type="submit" className={`btn ${styles.loginBtn}`}>Sign up</button>
                    </Form>
                    <h6>Already have an account?</h6>
                    <button type="button" className={`btn ${styles.signupBtn}`} onClick={() => (navigate("/login"))}>Sign in</button>
                </div>

            </div>
            <Footer></Footer>
        </div>
    )
} 