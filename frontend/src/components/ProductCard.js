import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { id, imageUrl, brand, name, reviewsCount, rating, price } = product;
    const navigate = useNavigate();

    const getInitialFavoriteState = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        return favorites.includes(id);
    };

    const [isFavorite, setIsFavorite] = useState(getInitialFavoriteState);

    // Function to toggle the favorite status
    const toggleFavorite = (e) => {
        e.stopPropagation(); // Prevent the navigation when clicking on the favorite button
        const newFavoriteStatus = !isFavorite;
        setIsFavorite(newFavoriteStatus);
        updateLocalStorage(newFavoriteStatus);
    };

    const updateLocalStorage = (newFavoriteStatus) => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (newFavoriteStatus) {
            localStorage.setItem('favorites', JSON.stringify([...favorites, id]));
        } else {
            localStorage.setItem('favorites', JSON.stringify(favorites.filter(favId => favId !== id)));
        }
    };

    const handleCardClick = () => {
        navigate(`/products/${product.id}`, { state: { product } });
    };

    // Generate stars based on the rating
    const renderStars = () => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <i key={i} className={`${i < Math.floor(rating) ? 'fas' : i < Math.ceil(rating) ? 'fas fa-star-half-alt' : 'far'} fa-star`} style={{ color: "gold" }}></i>
            );
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
            <button className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`} onClick={toggleFavorite}>
                <i className={`${isFavorite ? 'fas' : 'far'} fa-heart`}></i>
            </button>
        </div>
    );
};

export default ProductCard;
