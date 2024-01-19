import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { category } = useParams();
  const pageSize = 20; // Number of products to load per page

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `${process.env.REACT_APP_BACKEND_URL}/products/search?sortBy=reviewsCount&direction=DESC&size=${pageSize}&page=${page}`;
        if (category) {
          url += `&searchQuery=${category}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(prevProducts => [...prevProducts, ...data]);
        setHasMore(data.length === pageSize);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    if (hasMore) {
      fetchProducts();
    }
  }, [category, page]);

  // Function to handle scrolling near the bottom of the page
  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  // Add event listener for scrolling or use a library component here
  // For example, you can use an infinite scroll component here

  return (
    <div className="products">
      <h3>{category ? `"${category}" için ${products.length} sonuç` : ''}</h3>
      <div className="products-container">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {hasMore && (
          <button className="load-more-btn" onClick={loadMore}>Daha Fazla</button>
        )}
    </div>
  );
};

export default Products;
