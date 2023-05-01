import "./Home.css"
import { useEffect } from "react";
import HomeCarousel from "../Coponents/Carousel";
import { ProductCard } from "../Coponents/ProductCard";

export function Home() {
    var ratings = Array(Math.floor(24)).fill(0);
    var i = 0
    return (
        <div>
            <HomeCarousel></HomeCarousel>
            <div className="home-body">
                <h2 className="home-title">Trending products</h2>

                <div className="product-container">
                    {ratings.map((r) => {
                        i = i + 1;
                        return(<ProductCard sizeName={i}></ProductCard>)
                        
                    })}
                </div>

                <button className="btn more-Btn">More products &#62;</button>
            </div>

        </div>

    )
}



