import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import NavContact from './components/NavContact';
import Navbar from './components/Navbar';
import Categories from './components/Categories';
import Cards from './components/Cards'
import Products from './components/Products';
import FeaturedProducts from './components/FeaturedProducts';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [cartItemCount, setCartItemCount] = useState(0); // This would be determined by the state of the cart

  const [cards, setCards] = useState([]);
  const [products, setProducts] = useState([]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cards`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products/search?sortBy=reviewsCount&direction=DESC&size=60`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchCards();
    fetchProducts();
  }, []);

  const mostSelledProducts = products.slice(0,9);
  const mostLikedProducts = products.slice(9,18);
  console.log(products.length);
  console.log(products.slice(18,60).length)
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className='container'>
            <NavContact></NavContact>
            <Navbar isLoggedIn={isLoggedIn} cartItemCount={cartItemCount} onLogout={handleLogout}/>
            <Categories></Categories>
            <Routes>
              <Route index element={
                <>
                  <Cards cards={cards.slice(0,6)} />
                  <FeaturedProducts title="En Çok Satanlar" products={mostSelledProducts} /> {/* TODO: fetch most selled products*/}
                  <Cards cards={cards.slice(6,9)} />
                  <FeaturedProducts title="En Beğenilenler" products={mostLikedProducts} /> {/* TODO: fetch most selled products*/}
                  <Products products={products.slice(18,60)}></Products>
                </>
              } />
               <Route path="search/:category" element={<Products />} />
               <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess}/>} />
               <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </header>
      </div>
    </Router>
  );
}

export default App;
