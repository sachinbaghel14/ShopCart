import './App.css';
import { MoreProducts } from './pages/MoreProducts/MoreProducts';
import { Home } from './pages/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { SignUp } from './pages/SignUp/SignUp';
import { Product } from './pages/Product/Product';
import { Wishlist } from './pages/Wishlist/Wishlist';
import { Cart } from './pages/Cart/Cart';
import { Account } from './pages/Account/Account';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Home/>} ></Route>
          <Route path='more-products' element={<MoreProducts />} ></Route>
          <Route path='login' element={<Login/>} ></Route>
          <Route path='signup' element={<SignUp/>} ></Route>
          <Route path='product' element={<Product/>} ></Route>
          <Route path='wishlist' element={<Wishlist/>} ></Route>
          <Route path='cart' element={<Cart/>}></Route>
          <Route path='account' element={<Account/>}></Route>
          {/* <Route path='login' element={<Login />} ></Route> */}
        </Routes>
      </BrowserRouter>
      <ToastContainer></ToastContainer>
    </div>

  );
}

export default App;
