import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { id, imageUrl, brand, name, reviewsCount, rating, price } = product;
    const navigate = useNavigate();

    const getInitialFavoriteState = () => {
        const favorites = JSON.parse(localStorage.getItem('userFavorites')) || JSON.parse(localStorage.getItem('favorites')) || [];
        return favorites.includes(id);
    };

    const [isFavorite, setIsFavorite] = useState(getInitialFavoriteState);

    const toggleFavorite = async (e) => {
        e.stopPropagation();
        const newFavoriteStatus = !isFavorite;
    
        const userId = localStorage.getItem('userid');
        const token = localStorage.getItem('token');
    
        if (userId && token) {
            try {
                const method = newFavoriteStatus ? 'POST' : 'DELETE';
                const endpoint = newFavoriteStatus ? `/${userId}` : `/${userId}/${id}`;
                const headers = {
                    'Authorization': `Basic ${token}`,
                };
                if (newFavoriteStatus) {
                    headers['Content-Type'] = 'application/json';
                }
    
                console.log(`Sending product ID: ${id}`);
    
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/favorites${endpoint}`, {
                    method: method,
                    headers: headers,
                    body: newFavoriteStatus ? id : null,
                });
    
                if (response.ok) {
                    setIsFavorite(newFavoriteStatus);
                    updateLocalStorage('userFavorites', newFavoriteStatus);
                }
            } catch (error) {
                console.error('Error updating favorites:', error);
            }
        } else {
            setIsFavorite(newFavoriteStatus);
            updateLocalStorage('favorites', newFavoriteStatus);
        }
    };
    
    

    const updateLocalStorage = (key, newFavoriteStatus) => {
        const favorites = JSON.parse(localStorage.getItem(key)) || [];
        if (newFavoriteStatus) {
            localStorage.setItem(key, JSON.stringify([...favorites, id]));
        } else {
            localStorage.setItem(key, JSON.stringify(favorites.filter(favId => favId !== id)));
        }
    }

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
