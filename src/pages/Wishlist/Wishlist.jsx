import { useSelector } from "react-redux";
import { Footer } from "../../shared/Footer/Footer";
import { Header } from "../../shared/Header/Header";
import { ProductCard } from "../Coponents/ProductCard";
import { getWishlist } from "../../store/slices/cartSlices";

export function Wishlist(){
    var i=0;
    const wishlistItems = localStorage.getItem('whishlistItems')
    var arrayOfItems = false
    if (wishlistItems) {
        arrayOfItems = JSON.parse(wishlistItems)
    }
    const wishlist = useSelector(getWishlist)
    
    return (
        <div>
        <Header></Header>
            <div className="home-body">
                <h2 className="home-title">Wishlist</h2>

                <div className="product-container">
                    {arrayOfItems && arrayOfItems.map((product) => {
                        i = i + 1;
                        return (<ProductCard sizeName={i} item={product.product}></ProductCard>)

                    })}
                    {!arrayOfItems.length && <h3>No products in your wishlist, Please add.</h3>}
                </div>
            </div>
            <Footer></Footer>
        </div>

    )
}