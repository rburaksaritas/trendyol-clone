import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from './ProductCard';
import './Favorites.css';

const Favorites = () => {
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const isLoggedIn = !!localStorage.getItem('token');
  
    const favoriteIds = useMemo(() => {
      const key = isLoggedIn ? 'userFavorites' : 'favorites';
      return JSON.parse(localStorage.getItem(key)) || [];
    }, [isLoggedIn]); // Depend on isLoggedIn to determine which key to use
  
  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const fetchedProducts = [];
        for (const id of favoriteIds) {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products/${id}`);
          if (response.ok) {
            const productData = await response.json();
            fetchedProducts.push(productData);
          }
        }
        setFavoriteProducts(fetchedProducts);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    
    if (favoriteIds.length > 0) {
      fetchFavoriteProducts();
    }
  }, [favoriteIds]);

  return (
    <div className="favorites">
      <h3>Favori Ürünlerim</h3>
      <div className="products-container">
        {favoriteProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {favoriteProducts.length === 0 && <p>Favori ürününüz bulunmamaktadır.</p>}
    </div>
  );
};

export default Favorites;
