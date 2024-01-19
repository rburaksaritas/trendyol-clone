import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css'; // Your CSS file

const ProductCard = ({ product }) => {
    const { imageUrl, brand, name, reviewsCount, rating, price } = product;
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();

    // Function to toggle the favorite status
    const toggleFavorite = (e) => {
        e.stopPropagation(); // Prevent the navigation when clicking on the favorite button
        setIsFavorite(!isFavorite);
    };

    const handleCardClick = () => {
        navigate(`/products/${product.id}`, { state: { product } });
      };

    // Generate stars based on the rating
    const renderStars = () => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < Math.floor(rating)) {
                stars.push(<i key={i} className="fas fa-star" style={{ color: "gold" }}></i>);
            } else if (i < Math.ceil(rating)) {
                stars.push(<i key={i} className="fas fa-star-half-alt" style={{ color: "gold" }}></i>);
            } else {
                stars.push(<i key={i} className="far fa-star" style={{ color: "gold" }}></i>);
            }
        }
        return stars;
    };

    return (
        <div className="product-card" onClick={handleCardClick}>
            <div className="product-image">
                <img src={imageUrl} alt={`${brand} ${name}`} />
            </div>
            <div className="product-details">
                <h2 className="product-title"> <span className="brand-name">{brand}</span> {name} </h2>
                <div className="product-reviews">
                    {renderStars()}
                    <span className="product-reviews-count">({reviewsCount})</span>
                </div>
                <div className="product-price">{price} ₺</div>
            </div>
            <button className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`} onClick={(e) => { toggleFavorite(e) }}>
                <i className={`${isFavorite ? 'fas' : 'far'} fa-heart`}></i> {/* This will toggle between full and empty heart */}
            </button>
        </div>
    );
};

export default ProductCard;
