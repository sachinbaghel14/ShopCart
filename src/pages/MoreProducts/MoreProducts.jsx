import { useEffect, useState } from "react";
import { ProductCard } from "../Coponents/ProductCard";
import { Header } from "../../shared/Header/Header";
import { Footer } from "../../shared/Footer/Footer";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getfetch } from "../../store/slices/cartSlices";
import { LoadingSpinner } from "../Coponents/LoadingSpinner";

export function MoreProducts() {
    const location = useLocation()
    const getFetchProduct = useSelector(getfetch)
    var ratings = Array(Math.floor(24)).fill(0);
    var i = 0
    const [moreProducts, setMoreProducts] = useState([])
    useEffect(() => {
        setMoreProducts([])
        fetch(location.state.url)
            .then((res) => res.json())
            .then((jsonResponse) => {
                setMoreProducts(jsonResponse)
                console.log(moreProducts)
            }).catch((err) => {
                console.log(err)
            })
    }, [getFetchProduct])
    return (
        <div>
            <Header></Header>
            <div className="home-body">
                <h2 className="home-title">{location.state.title}</h2>

                <div className="product-container">
                    {moreProducts.length > 0 ? (moreProducts.map((product) => {
                        i = i + 1;
                        return (<ProductCard sizeName={i} item={product}></ProductCard>)

                    })) : (
                        <LoadingSpinner title = "Loading, Please wait..."></LoadingSpinner>
                    )}
                </div>
            </div>
            <Footer></Footer>
        </div>

    )
}