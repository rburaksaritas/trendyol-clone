import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import './Products.css';

const Products = ({ products }) => {
  
  const { category } = useParams();
  const search_term = category;

  return (
    <div className="products">
      <h3>"{search_term}" için sonuçlar</h3>
      <div className="products-container">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
