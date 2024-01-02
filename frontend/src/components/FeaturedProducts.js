import React from 'react';
import ProductCard from './ProductCard';
import './FeaturedProducts.css';

const FeaturedProducts = ({ title, products }) => {
  return (
    <div className="featured-products">
      <h3>{title}</h3>
      <div className="featured-products-container">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
