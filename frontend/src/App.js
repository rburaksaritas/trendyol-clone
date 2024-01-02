import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavContact from './components/NavContact';
import Navbar from './components/Navbar';
import Categories from './components/Categories';
import Cards from './components/Cards'
import Products from './components/Products';
import FeaturedProducts from './components/FeaturedProducts';

function App() {
  const isLoggedIn = false; // This would be determined by authentication logic
  const cartItemCount = 1; // This would be determined by the state of the cart
  
 const [cards, setCards] = useState([]);

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

    fetchCards();
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className='container'>
            <NavContact></NavContact>
            <Navbar isLoggedIn={isLoggedIn} cartItemCount={cartItemCount} />
            <Categories></Categories>
           <Routes>
              <Route index element={
                <>
                  <Cards cards={cards} />
                  <FeaturedProducts title="En Çok Satanlar" products={mostSelledProducts} /> // TODO: fetch most selled products
                </>
              } />
              <Route path="search/:category" element={<Products products={mockProducts} />} />
            </Routes>
          </div>
        </header>
      </div>
    </Router>
  );
}

export default App;
