import logo from './logo.svg';
import './App.css';
import { Headers } from "./shared/Header/Header"
import { Footer } from './shared/Footer/Footer';
import { Home } from './pages/Home/Home';

function App() {
  return (
    <div>
      <Headers></Headers>
      <Home></Home>
      <Footer></Footer>
    </div>

  );
}

export default App;
