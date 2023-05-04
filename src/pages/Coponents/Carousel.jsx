import { addFetchProducts } from "../../store/slices/cartSlices";
import { useDispatch } from "react-redux";
import carousel1 from "../../assets/carousel1.jpg"
import carousel2 from "../../assets/carousel2.jpg"
import carousel3 from "../../assets/carousel3.jpg"
import "./Carousel.css"

import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from "react-router-dom";

export default function HomeCarousel() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function handleShop(){
        navigate("/more-products", {
                state: {
                    title: 'Trending products',
                    url: 'https://fakestoreapi.com/products'
                }
            }); 
            dispatch(addFetchProducts(6))
    }
    return (
        <Carousel fade indicators={false}>
            <Carousel.Item>
                <div className='item-carousel'>
                    <div className='carousel-title'>
                        <div>
                            <p className='cor-first-p'>Has just arrived!</p>
                            <h1 className='heading'>Huge Summer Collection</h1>
                            <p className='cor-sec-p'>Swimwear, Tops, Shorts, Sunglasses & much more...</p>
                            <button onClick={handleShop} className='btn btn-danger shop-btn'>Shop Now &#62;</button>
                        </div>

                    </div>
                    <img
                        className="d-block w-100"
                        src={carousel1}
                        alt="first slide"
                    />
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className='item-carousel'>
                    <div className='carousel-title t-2'>
                        <div>
                            <p className='cor-first-p'>Complete your look with</p>
                            <h1 className='heading'>New Men's Accessories</h1>
                            <p className='cor-sec-p'>Hats & Caps, Sunglasses, Bags & much more...</p>
                            <button onClick={handleShop} className='btn btn-danger shop-btn'>Shop Now &#62;</button>
                        </div>
                    </div>
                    <img
                        className="d-block w-100"
                        src={carousel2}
                        alt="Second slide"
                    />
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className='item-carousel'>
                    <div className='carousel-title t-3'>
                        <div>
                            <p className='cor-first-p'>Hurry up! Limited time offer.</p>
                            <h1 className='heading'>Women Sportswear Sale</h1>
                            <p className='cor-sec-p'>Sneakers, Keds, Sweatshirts, Hoodies & much more...</p>
                            <button onClick={handleShop} className='btn btn-danger shop-btn'>Shop Now &#62;</button>
                        </div>
                    </div>
                    <img
                        className="d-block w-100"
                        src={carousel3}
                        alt="third slide"
                    />
                </div>
            </Carousel.Item>
        </Carousel>
    );
}
