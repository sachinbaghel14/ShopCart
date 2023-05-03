import { useEffect, useState } from "react";
import { ProductCard } from "../Coponents/ProductCard";
import { Header } from "../../shared/Header/Header";
import { Footer } from "../../shared/Footer/Footer";
export function MoreProducts() {
    var ratings = Array(Math.floor(24)).fill(0);
    var i = 0
    const [moreProducts, setMoreProducts] = useState([])


    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((jsonResponse) => {
                setMoreProducts(jsonResponse)
                console.log(moreProducts)
            }).catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <div>
        <Header></Header>
            <div className="home-body">
                <h2 className="home-title">Trending products</h2>

                <div className="product-container">
                    {moreProducts && moreProducts.map((product) => {
                        i = i + 1;
                        return (<ProductCard sizeName={i} item={product}></ProductCard>)

                    })}
                    {moreProducts && moreProducts.map((product) => {
                        i = i + 1;
                        return (<ProductCard sizeName={i} item={product}></ProductCard>)

                    })}
                </div>
            </div>
            <Footer></Footer>
        </div>

    )
}