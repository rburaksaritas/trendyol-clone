import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `${process.env.REACT_APP_BACKEND_URL}/products/search`;
        if (category) {
          if (category === "çok satanlar"){
            url += `?sortBy=reviewsCount&direction=DESC&size=200`;   
          } else if (category === "flaş ürünler"){
            url += `?searchQuery=yeni&size=200`;  
        } else {
            url += `?sortBy=reviewsCount&direction=DESC&size=200&searchQuery=${category}`;
          }
         
          
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="products">
      <h3>{category ? `"${category}" için ${products.length} sonuçlar` : ''}</h3>
      <div className="products-container">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
