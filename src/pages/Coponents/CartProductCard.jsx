
import { useNavigate } from "react-router-dom";
import styles from "./CartProductCard.module.css";
import { useDispatch } from "react-redux";
import { addItem } from "../../store/slices/cartSlices";


export function CartProductCard(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    function redirectToProduct() {
        navigate("/product", {
            state: props.item.product
        });
    }
    function getDecimalPart(num) {
        if (Number.isInteger(num)) {
            return '00';
        }
        const decimalStr = num.toString().split('.')[1];
        return Number(decimalStr);
    }
    function handleRemoveCart() {
        const cartItems = localStorage.getItem('cartItems')
        if (cartItems) {
            var arrayOfItems = JSON.parse(cartItems)
            const itemAreadyExistsIndex = arrayOfItems.findIndex(
                (i) => i.product.id == props.item.product.id,
            )
            // if product already added to cart, increase the quantity.
        // if product exists (index!=-1)
        if (itemAreadyExistsIndex != -1) {
            arrayOfItems.splice(itemAreadyExistsIndex, 1)
            localStorage.setItem('cartItems', JSON.stringify(arrayOfItems))
            dispatch(addItem(arrayOfItems));
        }
        } 
    }

    return (
        <div className={styles.productContainer}>
            <div className={styles.leftContainer}>
                <div className={styles.imageDiv}>
                    <img onClick={redirectToProduct} src={props.item.product.image} alt="product image"></img>
                </div>
                <div className={styles.productDetails}>
                    <div onClick={redirectToProduct} className={styles.name}>
                        <span>{props.item.product.title}</span>
                    </div>
                    <div className={styles.sizeDesc}>
                        <span className="text-muted me-2">Size:</span>M
                    </div>
                    <div className={styles.sizeDesc}>
                        <span className="text-muted me-2">Description:</span>{props.item.product.description}
                    </div>
                    <div className={styles.priceDiv}>
                        <span className={styles.price}>&#8377;{Math.floor(props.item.product.price)}.<small>{getDecimalPart(props.item.product.price)}</small></span>
                    </div>

                </div>

            </div>

            <div className={styles.rightContainer}>
                <label className={`form-label ${styles.qtyLabel}`} for="quantity1">Quantity</label>
                <input className={`form-control ${styles.qtyInput}`} type="number" id="quantity1" min="1" value="1"></input>

                <button className={`btn ${styles.removeBtn}`} onClick={handleRemoveCart}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                    Remove
                </button>
            </div>
        </div>
    )
}
