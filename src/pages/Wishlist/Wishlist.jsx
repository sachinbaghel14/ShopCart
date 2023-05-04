import { Footer } from "../../shared/Footer/Footer";
import { Header } from "../../shared/Header/Header";
import { ProductCard } from "../Coponents/ProductCard";

export function Wishlist(){
    var i=0;
    const cartItems = localStorage.getItem('whishlistItems')
    console.log(cartItems)
    if (cartItems) {
        var arrayOfItems = JSON.parse(cartItems)
        console.log(arrayOfItems[0].product.title)
    }
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
                    {!arrayOfItems && <h3>No product in your wishlist, Please add.</h3>}
                </div>
            </div>
            <Footer></Footer>
        </div>

    )
}