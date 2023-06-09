import { useNavigate } from "react-router-dom";
import { Footer } from "../../shared/Footer/Footer"
import { Header } from "../../shared/Header/Header"
import styles from "./Cart.module.css"
import { CartProductCard } from "../Coponents/CartProductCard"
import { ProductCard } from "../Coponents/ProductCard";
import { useSelector } from "react-redux";
import { cartQuantity, getTotal } from "../../store/slices/cartSlices";
import { toast } from "react-toastify";


export function Cart() {
    var i = 0;
    var arrayOfItems = false
    const navigate = useNavigate()
    const cartItems = localStorage.getItem('cartItems')
    if (cartItems) {
        arrayOfItems = JSON.parse(cartItems)
    }

    function getDecimalPart(num) {
        if (Number.isInteger(num)) {
            return '00';
        }
        const decimalStr = num.toString().split('.')[1];
        return Number(decimalStr);
    }

    let total = useSelector(getTotal)
    const cart = useSelector(cartQuantity)

    return (
        <div>
            <Header></Header>
            <div>
                <div className={styles.title}>
                    <h3>Your cart</h3>
                </div>
                <div className={styles.cartContainer}>
                    <div className={styles.cartProduct}>
                        {arrayOfItems && arrayOfItems.map((product) => {
                            return (<CartProductCard item={product}></CartProductCard>)
                        })}
                        {!arrayOfItems.length && <h3>No products in your cart, Please add.</h3>}
                    </div>
                    <div className={styles.subtotal}>
                        <div>
                            <h2>Subtotal</h2>
                            <h3>&#8377;{Math.floor(total)}.<small>{getDecimalPart(total)}</small></h3>
                        </div>
                        <hr></hr>
                        <button className={`btn ${styles.checkoutBtn}`} onClick={() => toast.success("Order Placed!", {
                            position: toast.POSITION.BOTTOM_RIGHT
                        })}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-credit-card" viewBox="0 0 16 16">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
                                <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z" />
                            </svg> Proceed to Checkout</button>

                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}