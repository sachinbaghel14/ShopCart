
import { useState } from "react";
import styles from "./ProductCard.module.css"

import { Tooltip } from "react-bootstrap"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"


export function ProductCard(props) {
    const [style, setStyle] = useState({ opacity: '0', visibility: 'visible' });

    let rating = props.item.rating.rate
    var fillStar = Array(Math.floor(rating)).fill(0);
    var halfFIllStar = false;
    var star = Array(5 - Math.floor(rating)).fill(0)

    if (rating !== Math.floor(rating)) {
        star = Array(4 - Math.floor(rating)).fill(0)
        halfFIllStar = true
    }

    return (
        <div className={styles.product} onMouseEnter={e => {
            setStyle({ opacity: '1', visibility: 'visible' })
        }} onMouseLeave={e => {
            setStyle({ opacity: '0', visibility: 'hidden' })
        }}>
            <OverlayTrigger
                delay={{ hide: 450, show: 300 }}
                overlay={(props) => (
                    <Tooltip {...props} className={styles.hint}>
                        Add to wishlist
                    </Tooltip>
                )}
                placement="left"
            >
                <div className={styles.wishlistDiv}>

                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>

                </div>
            </OverlayTrigger>
            <img src={props.item.image} className={`card-img-top ${styles.productImg}`} alt="..."></img>
            <div className={styles.productDetails}>
                <p className={styles.category}>{props.item.category}</p>
                <h6 className={styles.name}>{props.item.title}</h6>
                <div className={styles.PRdiv}>
                    <div><span className={styles.price}>&#8377;{props.item.price}.<span className={styles.priceDec}>00</span></span></div>
                    <div className={styles.RCdiv}>
                        <div>
                            {
                                fillStar.map((r) => (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                    </svg>
                                ))}

                            {halfFIllStar && <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-star-half" viewBox="0 0 16 16">
                                <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
                            </svg>}
                            {star &&
                                star.map((e) => (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                    </svg>
                                ))
                            }
                        </div>
                        <div>
                            <p className={styles.ratingCount}>({props.item.rating.count})</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className={styles.extraOptions} style={style}>

                <div className={styles.bdgS}>
                    <input type="radio" name={`size${props.sizeName}`} id={`XS${props.sizeName}`} className={styles.sizeInput}></input>
                    <label className={styles.sizeLabel} htmlFor={`XS${props.sizeName}`}>XS</label>
                    <input type="radio" name={`size${props.sizeName}`} id={`S${props.sizeName}`} className={styles.sizeInput}></input>
                    <label className={styles.sizeLabel} htmlFor={`S${props.sizeName}`}>S</label>
                    <input type="radio" name={`size${props.sizeName}`} id={`M${props.sizeName}`}  className={styles.sizeInput} defaultChecked></input>
                    <label className={styles.sizeLabel} htmlFor={`M${props.sizeName}`} >M</label>
                    <input type="radio" name={`size${props.sizeName}`} id={`L${props.sizeName}`} className={styles.sizeInput}></input>
                    <label className={styles.sizeLabel} htmlFor={`L${props.sizeName}`}>L</label>
                </div>
                <button className={`btn ${styles.cartBtn}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class={`bi bi-cart3 ${styles.crtBtnIcon}`} viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg> Add to Cart</button>
            </div>
        </div>
    )
}