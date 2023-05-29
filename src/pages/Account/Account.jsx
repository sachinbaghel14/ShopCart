import { Footer } from "../../shared/Footer/Footer"
import { Header } from "../../shared/Header/Header"
import styles from "./Account.module.css"
import profileImg from "../../assets/profile.jpg"
import { useDispatch, useSelector } from "react-redux"
import { addUser, cartQuantity, getUser, getWishlist } from "../../store/slices/cartSlices"
import { useNavigate } from "react-router-dom"
import { Form } from "react-bootstrap"
import { useFormik } from "formik";
import * as Yup from "yup"
import { toast } from "react-toastify"
import { LoadingSpinner } from "../Coponents/LoadingSpinner"
import { useState } from "react"

const accountSchema = Yup.object().shape({
    firstname: Yup.string()
        .required('First name is required')
        .min(3, 'First name cannot be less than 3 characters')
        .max(15, 'First name is too long!'),

    lastname: Yup.string()
        .required('Last name is required')
        .min(3, 'Last name cannot be less than 3 characters')
        .max(15, 'Last name is too long!'),

    email: Yup.string()
        .email('email type invalid')
        .required('Email is required'),

    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password cannot be less than 6 characters')
        .max(15, 'Password is too long!'),

    confirmpassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')

})

export function Account() {
    const [showSpinner, setShowSpinner] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector(getUser)
    const cartLength = useSelector(cartQuantity)
    const wishlistLength = useSelector(getWishlist)
    const navigate = useNavigate()

    function handleSignout() {
        dispatch(addUser({}))
        navigate("/")
    }

    function handleUpdate(values) {
        setShowSpinner(true)
        const userDetails = localStorage.getItem('userDetails')
        if (userDetails) {
            var arrayOfItems = JSON.parse(userDetails)
            const itemExistsIndex = arrayOfItems.findIndex(
                (i) => i.email === values.email,
            )
            if (itemExistsIndex !== -1) {
                arrayOfItems[itemExistsIndex].firstname = values.firstname
                arrayOfItems[itemExistsIndex].lastname = values.lastname
                arrayOfItems[itemExistsIndex].email = values.email
                arrayOfItems[itemExistsIndex].number = values.number
                arrayOfItems[itemExistsIndex].password = values.password
                arrayOfItems[itemExistsIndex].confirmpassword = values.confirmpassword
                arrayOfItems[itemExistsIndex].loggedin = true
                localStorage.setItem('userDetails', JSON.stringify(arrayOfItems));
                console.log("user found")
                dispatch(addUser(arrayOfItems[itemExistsIndex]))
                setShowSpinner(false)
                toast.success("Profile update successful!", {
                    position: toast.POSITION.BOTTOM_RIGHT
                  });
            }
        }
    }
    const formik = useFormik({
        initialValues: user,
        onSubmit: handleUpdate,
        validationSchema: accountSchema,

    });

    return (
        <div>
            <Header></Header>
            {showSpinner && <div className={styles.loadingSpinner}><LoadingSpinner title = "Profile updating, Please wait..."></LoadingSpinner></div>}
           {!showSpinner && <div>
                <div className={styles.title}>
                    <h3>Your Account</h3>
                    <button className={`btn ${styles.signout}`} onClick={handleSignout}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                            <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                        </svg>
                        Sign out
                    </button>
                </div>
                <div className={styles.container}>
                    <div className={styles.leftDiv}>
                        <div className={styles.profile}>
                            <div className={styles.imgDiv}>
                                <img className={styles.profileImg} src={profileImg}></img>
                            </div>
                            <div className={styles.imgTitle}>
                                <h3>{user.firstname} {user.lastname}</h3>
                                <span className="">{user.email}</span>
                            </div>
                        </div>
                        <div className={styles.Dashboard}>
                            <h3>Dashboard</h3>
                        </div>
                        <div className={styles.DashItem} onClick={() => (navigate("/cart"))}>
                            <div className={styles.dashItemTitle}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class={`bi bi-cart3 ${styles.headerSvg}`} viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg>
                                <a>Cart</a>
                            </div>
                            <span>{cartLength}</span>
                        </div>

                        <div className={styles.DashItem} onClick={() => (navigate("/wishlist"))}>
                            <div className={styles.dashItemTitle}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class={`bi bi-heart ${styles.headerSvg}`} viewBox="0 0 16 16">
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                </svg>
                                <a>Wishlist</a>
                            </div>
                            <span>{wishlistLength}</span>
                        </div>

                        <div className={`${styles.DashItem} ${styles.lastDashItem}`} onClick={() => (navigate("/cart"))}>
                            <div className={styles.dashItemTitle}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
                                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                </svg>
                                <a>Orders</a>
                            </div>
                            <span>0</span>
                        </div>
                    </div>
                    <div className={styles.rightDiv}>
                        <Form noValidate className="loginform" onSubmit={formik.handleSubmit}>
                            <div className={`mb-3 ${styles.formContainer}`}>
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

                            <div className={`mb-3 ${styles.formContainer}`}>
                                <Form.Group className="mb-3" controlId="validationCustomUsername">
                                    <Form.Label className={styles.formLabel}>
                                        Email Address
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
                            </div>
                            <div className={`mb-3 ${styles.formContainer}`}>
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
                                        Confirm Password
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
                            </div>
                            <button type="submit" className={`btn ${styles.signout}`}>Update profile</button>
                        </Form>
                    </div>
                </div>
            </div>
           }

            <Footer></Footer>
        </div>
    )
}