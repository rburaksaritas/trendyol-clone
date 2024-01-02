import React from 'react';
import ProductCard from './ProductCard';
import './Products.css';

const Products = ({ search_term, products }) => {
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
