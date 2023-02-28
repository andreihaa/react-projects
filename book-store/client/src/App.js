import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ManageBook from "./pages/manageBook/ManageBook";
import Book from "./pages/bookPage/Book";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Cart from "./pages/cart/Cart";
import Favorites from "./pages/favoritesPage/Favorites";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/book/:id" element={<Book/>}/>
          <Route path="/manage-book" element={<ManageBook/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/favorites" element={<Favorites />}/>
        </Routes>
      </Router>
  );
}

export default App;
