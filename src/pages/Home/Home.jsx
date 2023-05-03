import "./Home.css"
import { Header } from "../../shared/Header/Header";
import { Footer } from "../../shared/Footer/Footer"
import { useEffect, useState } from "react";
import HomeCarousel from "../Coponents/Carousel";
import { ProductCard } from "../Coponents/ProductCard";
import { useNavigate } from "react-router-dom";

export function Home() {
    var ratings = Array(Math.floor(24)).fill(0);
    var i = 0
    const [products, setProducts] = useState([])

    const navigate = useNavigate();
    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((jsonResponse) => {
                setProducts(jsonResponse)
                console.log(products)
            }).catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <div>
        <Header></Header>
            <HomeCarousel></HomeCarousel>
            <div className="home-body">
                <h2 className="home-title">Trending products</h2>

                <div className="product-container">
                    {products && products.map((product) => {
                        i = i + 1;
                        return (<ProductCard sizeName={i} item={product}></ProductCard>)

                    })}
                </div>

                <button className="btn more-Btn" onClick={()=>(navigate("/more-products") )} >More products &#62;</button>
            </div>
        <Footer></Footer>
        </div>

    )
}



