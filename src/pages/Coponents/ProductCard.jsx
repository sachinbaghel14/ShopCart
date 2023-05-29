
import { useEffect, useState } from "react";
import styles from "./ProductCard.module.css"
import { Rating } from "./Rating";
import { Tooltip } from "react-bootstrap"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import { useDispatch, useSelector } from "react-redux";
import { addItem, addWishlistItem, getWishlist } from "../../store/slices/cartSlices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function ProductCard(props) {
    const wishlist = useSelector(getWishlist)
    const [inWishlist, setInWishlist] = useState(false)
    const [style, setStyle] = useState({ opacity: '0', visibility: 'visible' });
    const dispatchEvent = useDispatch()
    const navigate = useNavigate()
    const getWishlistinfo = useSelector(getWishlist)

    useEffect(() => {
        const whishlistItems = localStorage.getItem('whishlistItems')
        if (whishlistItems) {
            var arrayOfWishlist = JSON.parse(whishlistItems)
            const itemAreadyExistsIndex = arrayOfWishlist.findIndex(
                (i) => i.product.id == props.item.id,)
                if (itemAreadyExistsIndex != -1) {
                    setInWishlist(true);
                } else {
                    setInWishlist(false);
                }
        }
    }, [getWishlistinfo])
    
    function redirectToProduct() {
        navigate("/product", {
            state: props.item
        })
    }
    function getDecimalPart(num) {
        if (Number.isInteger(num)) {
            return '00';
        }

        const decimalStr = num.toString().split('.')[1];
        return Number(decimalStr);
    }

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
            product: props.item,
            quantity: 1,
        }
        const itemAreadyExistsIndex = arrayOfItems.findIndex(
            (i) => i.product.id == props.item.id,
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
        console.log(arrayOfItems)
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
            product: props.item,
        }
        const itemAreadyExistsIndex = arrayOfWishlist.findIndex(
            (i) => i.product.id == props.item.id,
        )
        // if product already added to wishlist
        // if product exists (index!=-1)
        if (itemAreadyExistsIndex != -1) {
            arrayOfWishlist.splice(itemAreadyExistsIndex,1)
            setInWishlist(false);
            toast.error(`Removed From Wishlist "${props.item.title}"`, {
                position: toast.POSITION.BOTTOM_RIGHT
              });
        } else {
            setInWishlist(true);
            arrayOfWishlist.push(whishlistItem)
            toast.success(`Added To Wishlist "${props.item.title}"`, {
                position: toast.POSITION.BOTTOM_RIGHT
              });
        }
        localStorage.setItem('whishlistItems', JSON.stringify(arrayOfWishlist))
        dispatchEvent(addWishlistItem(arrayOfWishlist));
    }

    return (
        <div className={styles.product} onMouseEnter={e => {
            setStyle({ opacity: '1', visibility: 'visible' })
        }} onMouseLeave={e => {
            setStyle({ opacity: '0', visibility: 'hidden' })
        }}
        >
            <OverlayTrigger
                delay={{ hide: 450, show: 300 }}
                overlay={(props) => (
                    <Tooltip {...props} className={styles.hint}>
                        Add to wishlist
                    </Tooltip>
                )}
                placement="left"
            >
                <div onClick={handleWishlist} className={styles.wishlistDiv}>

                    {!inWishlist &&<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>}
                    {inWishlist && <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class={`bi bi-heart-fill ${styles.wishlistFill}`} viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                    </svg>}

                </div>
            </OverlayTrigger>
            <img onClick={redirectToProduct} src={props.item.image} className={`card-img-top ${styles.productImg}`} alt="..."></img>
            <div className={styles.productDetails}>
                <p className={styles.category}>{props.item.category}</p>
                <div onClick={redirectToProduct} className={styles.name}>{props.item.title}</div>
                <div className={styles.PRdiv}>
                    <div><span className={styles.price}>&#8377;{Math.floor(props.item.price)}.<span className={styles.priceDec}>{getDecimalPart(props.item.price)}</span></span></div>
                    <div className={styles.RCdiv}>
                        <Rating rating={props.item.rating.rate} size={"12"} ></Rating>
                        <div>
                            <p className={styles.ratingCount}>({props.item.rating.count})</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className={styles.extraOptions} style={style}>

                <div className={styles.bdgS}>
                    <input type="radio" name={`size${props.sizeName}`} id={`XS${props.sizeName}`} className={styles.sizeInput}></input>
                    <label className={styles.sizeLabel} htmlFor={`XS${props.sizeName}`}>XS</label>
                    <input type="radio" name={`size${props.sizeName}`} id={`S${props.sizeName}`} className={styles.sizeInput}></input>
                    <label className={styles.sizeLabel} htmlFor={`S${props.sizeName}`}>S</label>
                    <input type="radio" name={`size${props.sizeName}`} id={`M${props.sizeName}`} className={styles.sizeInput} defaultChecked></input>
                    <label className={styles.sizeLabel} htmlFor={`M${props.sizeName}`} >M</label>
                    <input type="radio" name={`size${props.sizeName}`} id={`L${props.sizeName}`} className={styles.sizeInput}></input>
                    <label className={styles.sizeLabel} htmlFor={`L${props.sizeName}`}>L</label>
                </div>
                <button className={`btn ${styles.cartBtn}`} onClick={handleAddToCartClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class={`bi bi-cart3 ${styles.crtBtnIcon}`} viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg> Add to Cart</button>
                    
            </div>
            
        </div>
    )
}