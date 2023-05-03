import './App.css';
import { MoreProducts } from './pages/MoreProducts/MoreProducts';
import { Home } from './pages/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { SignUp } from './pages/SignUp/SignUp';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Home/>} ></Route>
          <Route path='more-products' element={<MoreProducts />} ></Route>
          <Route path='login' element={<Login/>} ></Route>
          <Route path='signup' element={<SignUp/>} ></Route>
          {/* <Route path='login' element={<Login />} ></Route> */}
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
