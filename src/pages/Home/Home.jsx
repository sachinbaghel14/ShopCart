import "./Home.css"
import { useEffect } from "react";
import HomeCarousel from "../Coponents/Carousel";
import { ProductCard } from "../Coponents/ProductCard";

export function Home() {
    var ratings = Array(Math.floor(24)).fill(0);
    return (
        <div>
            <HomeCarousel></HomeCarousel>
            <h2 className="home-title">Trending products</h2>
            <div className="product-container">
            {ratings.map((r) => (<ProductCard></ProductCard>))}
            </div>
        </div>
        
    )
}



