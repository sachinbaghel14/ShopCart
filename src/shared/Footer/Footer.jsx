import styles from "./Footer.module.css"


export function Footer() {
    return (
        // < !--Remove the container if you want to extend the Footer to full width. -- >
        <div className={ styles.bgColor}>
            <footer
                className="text-center text-lg-start text-white"
            >
                <div className="container p-4 pb-0">
                    <section className="">
                        <div className="row">
                            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold">
                                    Company name
                                </h6>
                                <p>
                                    Here you can use rows and columns to organize your footer
                                    content. Lorem ipsum dolor sit amet, consectetur adipisicing
                                    elit.
                                </p>
                            </div>

                            <hr className="w-100 clearfix d-md-none" />

                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold">Products</h6>
                                <p>
                                    <a className="text-white">MDBootstrap</a>
                                </p>
                                <p>
                                    <a className="text-white">MDWordPress</a>
                                </p>
                                <p>
                                    <a className="text-white">BrandFlow</a>
                                </p>
                                <p>
                                    <a className="text-white">Bootstrap Angular</a>
                                </p>
                            </div>

                            <hr className="w-100 clearfix d-md-none" />

                            <hr className="w-100 clearfix d-md-none" />

                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                                <p><i className="fas fa-home mr-3"></i> New York, NY 10012, US</p>
                                <p><i className="fas fa-envelope mr-3"></i> info@gmail.com</p>
                                <p><i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
                                <p><i className="fas fa-print mr-3"></i> + 01 234 567 89</p>
                            </div>

                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold">Follow us</h6>

                                <a
                                    className="btn btn-primary btn-floating m-1"
                                    href="#!"
                                    role="button"
                                ><i className="fab fa-facebook-f"></i></a>
                                <a
                                    className="btn btn-primary btn-floating m-1"
                                    href="#!"
                                    role="button"
                                ><i className="fab fa-twitter"></i></a>
                                <a
                                    className="btn btn-primary btn-floating m-1"
                                    href="#!"
                                    role="button"
                                ><i className="fab fa-google"></i></a>

                                <a
                                    className="btn btn-primary btn-floating m-1"
                                    href="#!"
                                    role="button"
                                ><i className="fab fa-instagram"></i></a>

                                <a
                                    className="btn btn-primary btn-floating m-1"
                                    href="#!"
                                    role="button"
                                ><i className="fab fa-linkedin-in"></i></a>
                                <a
                                    className="btn btn-primary btn-floating m-1"
                                    href="#!"
                                    role="button"
                                ><i className="fab fa-github"></i></a>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="text-center p-3">
                    © 2020 Copyright:
                    <a className="text-white" href="https://mdbootstrap.com/"
                    >MDBootstrap.com</a>
                </div>
            </footer>
        </div>
    )
}