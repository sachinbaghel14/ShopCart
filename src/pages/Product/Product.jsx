
import { useLocation } from "react-router-dom"
import styles from "./product.module.css"
import { Header } from "../../shared/Header/Header"
import { Footer } from "../../shared/Footer/Footer"
import { Rating } from "../Coponents/Rating"
import { useDispatch, useSelector } from "react-redux";
import { addItem, addWishlistItem, getWishlist } from "../../store/slices/cartSlices";
import { useEffect, useState } from "react"
import { LoadingSpinner } from "../Coponents/LoadingSpinner"

export function Product() {
    const location = useLocation()
    const dispatchEvent = useDispatch()
    const [inWishlist, setInWishlist] = useState(false)
    const [showSpinner, setShowSpinner] = useState(true)
    function getDecimalPart(num) {
        if (Number.isInteger(num)) {
            return '00';
        }

        const decimalStr = num.toString().split('.')[1];
        return Number(decimalStr);
    }
    const getWishlistinfo = useSelector(getWishlist)

    useEffect(() => {
        const whishlistItems = localStorage.getItem('whishlistItems')
        if (whishlistItems) {
            var arrayOfWishlist = JSON.parse(whishlistItems)
            const itemAreadyExistsIndex = arrayOfWishlist.findIndex(
                (i) => i.product.id == location.state.id,)
                if (itemAreadyExistsIndex != -1) {
                    setInWishlist(true);
                } else {
                    setInWishlist(false);
                }
        }
    }, [getWishlistinfo])
    function handleAddToCartClick() {

        // if cart already exists
        const cartItems = localStorage.getItem('cartItems')
        if (!cartItems) {
            var arrayOfItems = []
        } else {
            var arrayOfItems = JSON.parse(cartItems)
        }
        // add the product to cart.
        const cartItem = {
            product: location.state,
            quantity: 1,
        }
        const itemAreadyExistsIndex = arrayOfItems.findIndex(
            (i) => i.product.id == location.state.id,
        )
        // if product already added to cart, increase the quantity.
        // if product exists (index!=-1)
        if (itemAreadyExistsIndex != -1) {
            arrayOfItems[itemAreadyExistsIndex].quantity += 1
            toast.info(`Product Already In The Cart`, {
                position: toast.POSITION.BOTTOM_RIGHT
              });
        } else {
            arrayOfItems.push(cartItem)
            toast.success(`Added To Cart "${props.item.title}"`, {
                position: toast.POSITION.BOTTOM_RIGHT
              });
        }
        localStorage.setItem('cartItems', JSON.stringify(arrayOfItems))
        dispatchEvent(addItem(arrayOfItems));
        // notifyAboutCartChanges(arrayOfItems.length)

    }
    function handleWishlist(){
        const whishlistItems = localStorage.getItem('whishlistItems')
        if (!whishlistItems) {
            var arrayOfWishlist = []
        } else {
            var arrayOfWishlist = JSON.parse(whishlistItems)
        }
        // add the product to wishlist.
        const whishlistItem = {
            product: location.state,
        }
        const itemAreadyExistsIndex = arrayOfWishlist.findIndex(
            (i) => i.product.id == location.state.id,
        )
        // if product already added to wishlist
        // if product exists (index!=-1)
        if (itemAreadyExistsIndex != -1) {
            arrayOfWishlist.splice(itemAreadyExistsIndex,1)
            setInWishlist(false);
        } else {
            setInWishlist(true);
            arrayOfWishlist.push(whishlistItem)
        }
        localStorage.setItem('whishlistItems', JSON.stringify(arrayOfWishlist))
        dispatchEvent(addWishlistItem(arrayOfWishlist));
    }


    return (
        <div>
            <Header></Header>
            {location.state ? (
            <div>
                <div className={styles.productContainer}>
                    <div className={styles.productImgDiv}>
                        <div className={styles.thumblist}>
                            <input type="radio" name="slide" id="s1" className={styles.thumblistInput} defaultChecked></input>
                            <label className={styles.thumblistLabel} htmlFor="s1"><img className="" src={location.state.image} alt="first slide" /></label>
                            <input type="radio" name="slide" id="s2" className={styles.thumblistInput}></input>
                            <label className={styles.thumblistLabel} htmlFor="s2"><img className="" src={location.state.image} alt="second slide" /></label>
                            <input type="radio" name="slide" id="s3" className={styles.thumblistInput}></input>
                            <label className={styles.thumblistLabel} htmlFor="s3" ><img className="" src={location.state.image} alt="third slide" /></label>
                            <input type="radio" name="slide" id="s4" className={styles.thumblistInput}></input>
                            <label className={styles.thumblistLabel} htmlFor="s4"><img className="" src={location.state.image} alt="fourth slide" /></label>
                        </div>
                        <div className={styles.productImg}>
                            <div onClick={handleWishlist} className={styles.wishlistDiv}>

                                {!inWishlist && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                </svg>}
                                {inWishlist && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class={`bi bi-heart-fill ${styles.wishlistFill}`} viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                </svg>}

                            </div>
                            <img className="" src={location.state.image} alt="Product Image" />
                        </div>
                    </div>

                    <div className={styles.productDetails}>
                        <div>
                            <h1>{location.state.title}</h1>
                        </div>
                        <div className={styles.rating}>
                            <Rating rating={location.state.rating.rate} size={"18"}></Rating>
                            <div className={styles.review}>
                                <span>{location.state.rating.count} Reviews</span>
                            </div>
                        </div>
                        <div className={styles.category}>
                            <p>{location.state.category}</p>
                        </div>
                        <hr></hr>
                        <div>
                            <span className={styles.price}>&#8377;{Math.floor(location.state.price)}.<small>{getDecimalPart(location.state.price)}</small></span>
                            <span>M.R.P.:</span>
                            <del className={styles.mrp}>&#8377;{Math.floor(location.state.price + 65)}.<small>{getDecimalPart(location.state.price)}</small></del>
                        </div>
                        <div className={styles.btmDetails}>
                            <select className={`form-select ${styles.sizeSelect}`} required="" id="product-size">
                                <option value="">Select size</option>
                                <option value="xs">XS</option>
                                <option value="s">S</option>
                                <option value="m">M</option>
                                <option value="l">L</option>
                                <option value="xl">XL</option>
                            </select>
                            <div className={styles.orderDiv}>
                                <select className={`form-select ${styles.qtySelect}`}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                <button className={`btn ${styles.cartBtn}`} onClick={handleAddToCartClick}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class={`bi bi-cart3 ${styles.crtBtnIcon}`} viewBox="0 0 16 16">
                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                    </svg> Add to Cart</button>

                            </div>
                            <div>
                                <h5>About this product</h5>
                                <p>{location.state.description}</p>
                            </div>

                        </div>


                    </div>
                </div>
            </div>
            ): (<LoadingSpinner title="Loading, Please wait..."></LoadingSpinner>)}
            <Footer></Footer>
        </div>
    )
}