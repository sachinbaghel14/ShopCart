import styles from "./Header.module.css"
import logo from "../../assets/logo.png"
import { Tooltip } from "react-bootstrap"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import { useDispatch, useSelector } from "react-redux"
import { addFetchProducts, addItem, cartQuantity, getTotal } from "../../store/slices/cartSlices"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUser } from "../../store/slices/cartSlices"




export function Header() {

  const [isLoggedIn, setLoggedInStatus] = useState(false)
  const navigate = useNavigate()

  //get data from local storage
  const cartItemsLength = useSelector(cartQuantity)
  const user = useSelector(getUser)
  console.log(user)
  const total = useSelector(getTotal);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    const cartItems = localStorage.getItem('cartItems')
    if(cartItems){
      var arrayOfItems = JSON.parse(cartItems)
      dispatch(addItem(arrayOfItems))
    }
  },[])
  function handleWishlist() {
    navigate("/wishlist")
  }
  function handleall() {
    navigate("/more-products", {
      state: {
        title: 'All products'
      }
    })
  }
  
  return (
    <div>
      <nav className={`navbar navbar-light bg-light ${styles.headerTop}`}>
        {/* logo */}
        <a href="/" className="navbar-brand"><img className={styles.logo} src={logo} alt="icon"></img></a>

        {/* Search Bar */}
        <form class="d-flex" role="search">
          <input class={`form-control me-2 ${styles.searchBar}`} type="search" placeholder="Search for products" aria-label="Search"></input>
          <div className={styles.searchIcon}>
            <button class={`btn ${styles.searchBtn}`} type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg></button>
          </div>

        </form>


        <div className={styles.rightHeader}>

          {/* Wishlist */}
          <div onClick={handleWishlist}>
            <OverlayTrigger
              delay={{ hide: 450, show: 300 }}
              overlay={(props) => (
                <Tooltip {...props} className={styles.hint}>
                  Wishlist
                </Tooltip>
              )}
              placement="top"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class={`bi bi-heart ${styles.headerSvg}`} viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
              </svg>
            </OverlayTrigger>
          </div>

          {/* sign in / my account */}

          <div className={styles.login} onClick={() => (navigate("/login"))}>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class={`bi bi-person ${styles.headerSvg}`} viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
              </svg>
            </div>
            <div className={styles.signInTitle}>
              {user.loggedin && <p>Hello, {user.name}</p>}
              {!user.loggedin && <p>Hello, Sign in</p>}
              <h6>My Account</h6>
            </div>
          </div>

          {/* cart */}
          <div className={styles.cart} onClick={()=>(navigate("/cart"))}>
            <div className={styles.cartIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class={`bi bi-cart3 ${styles.headerSvg}`} viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
            </div>
            <span className={`badge bg-secondary ${styles.hbdg}`}>{cartItemsLength}</span>
            <div className={styles.cartTitle}>
              <p>My Cart</p>
              <h6>&#8377;{total}&#9662;</h6>
            </div>
          </div>

        </div>
      </nav>

      {/* bottam header */}
      <nav className={`navbar navbar-light bg-light ${styles.headerbtm}`}>
        <a onClick={() => {(navigate("/more-products", {
          state: {
            title: 'All products',
            url: 'https://fakestoreapi.com/products'
          }
        }));dispatch(addFetchProducts(0))}} className={styles.category}>All</a>

        <a onClick={() => {(navigate("/more-products", {
          state: {
            title: 'Electronics',
            url: 'https://fakestoreapi.com/products/category/electronics'
          }
        }));dispatch(addFetchProducts(1))}} className={styles.category}>Electronics</a>

        <a onClick={() => {(navigate("/more-products", {
          state: {
            title: 'Jewelery',
            url: 'https://fakestoreapi.com/products/category/jewelery'
          }
        }));dispatch(addFetchProducts(2))}} className={styles.category}>Jewelery</a>

        <a onClick={() => {(navigate("/more-products", {
          state: {
            title: "Men's Clothing",
            url: "https://fakestoreapi.com/products/category/men's clothing"
          }
        }));dispatch(addFetchProducts(3))}} className={styles.category}>Men's Clothing</a>

        <a onClick={() => {(navigate("/more-products", {
          state: {
            title: "Women's clothing",
            url: "https://fakestoreapi.com/products/category/women's clothing",
          }
        }));dispatch(addFetchProducts(4))}} className={styles.category}>Women's Clothing</a>
      </nav>
    </div>
  )
}