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
        let url = `${process.env.REACT_APP_BACKEND_URL}/products/search?sortBy=reviewsCount&direction=DESC`;
        if (category) {
          if (category === "çok satanlar"){
            url += `&size=200`;   
          } else if (category === "flaş ürünler"){
            url += `&&size=62&searchQuery=yeni`;  
          } else {
            url += `&&size=10000&searchQuery=${category}`;
          }
        } else {
          url += `&size=62`;
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
      <h3>{category ? `"${category}" için ${products.length} sonuç` : ''}</h3>
      <div className="products-container">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
