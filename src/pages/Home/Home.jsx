import "./Home.css"
import { useEffect, useState } from "react";
import HomeCarousel from "../Coponents/Carousel";
import { ProductCard } from "../Coponents/ProductCard";

export function Home() {
    var ratings = Array(Math.floor(24)).fill(0);
    var i = 0
    const [products, setProducts] =useState([])
    const [cartQuantity, setCartQuantity] =useState(0)

    useEffect(()=>{
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((jsonResponse) => {
                setProducts(jsonResponse)
                console.log(products)
            }).catch((err) => {
                console.log(err)
            })
        const cartItems = localStorage.getItem('cartItems')

        if (cartItems) {
            setCartQuantity(JSON.parse(cartItems).length)
        }
    })
    return (
        <div>
            <HomeCarousel></HomeCarousel>
            <div className="home-body">
                <h2 className="home-title">Trending products</h2>

                <div className="product-container">
                    {products && products.map((product) => {
                        i = i + 1;
                        return(<ProductCard sizeName={i} item={product} setCartQuantity={setCartQuantity}></ProductCard>)
                        
                    })}
                </div>

                <button className="btn more-Btn">More products &#62;</button>
            </div>

        </div>

    )
}



