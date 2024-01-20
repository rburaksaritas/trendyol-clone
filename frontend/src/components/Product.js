import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Product.css';

const Product = ({ updateCartItemCount }) => {
    const location = useLocation();
    const { product } = location.state;

    const getInitialFavoriteState = () => {
        const favorites = JSON.parse(localStorage.getItem('userFavorites')) || JSON.parse(localStorage.getItem('favorites')) || [];
        return favorites.includes(product.id);
    };

    const [isFavorite, setIsFavorite] = useState(getInitialFavoriteState());

    const toggleFavorite = async () => {
        const newFavoriteStatus = !isFavorite;

        const userId = localStorage.getItem('userid');
        const token = localStorage.getItem('token');

        if (userId && token) {
            try {
                const method = newFavoriteStatus ? 'POST' : 'DELETE';
                const endpoint = newFavoriteStatus ? `/${userId}` : `/${userId}/${product.id}`;
                const headers = {
                    'Authorization': `Basic ${token}`,
                };
                if (newFavoriteStatus) {
                    headers['Content-Type'] = 'application/json';
                }

                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/favorites${endpoint}`, {
                    method: method,
                    headers: headers,
                    body: newFavoriteStatus ? product.id : null,
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
            localStorage.setItem(key, JSON.stringify([...favorites, product.id]));
        } else {
            localStorage.setItem(key, JSON.stringify(favorites.filter(favId => favId !== product.id)));
        }
    }

    const calculateTimeRemainingForFastShipping = () => {
        const now = new Date();
        const endOfDay = new Date(now);
        endOfDay.setDate(now.getDate() + 1); // Move to the next day
        endOfDay.setHours(0, 0, 0, 0); // Set to midnight

        // Get the difference in milliseconds
        const diffMs = endOfDay - now;

        // Convert milliseconds to hours and minutes
        const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // Hours
        const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // Minutes

        // Return the remaining time in hours and minutes
        return `${diffHrs} saat ${diffMins} dakika`;
    };

    const fastShippingTime = calculateTimeRemainingForFastShipping();

    // Generate stars based on the rating
    const renderStars = () => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < Math.floor(product.rating)) {
                stars.push(<i key={i} className="fas fa-star" style={{ color: "gold" }}></i>);
            } else if (i < Math.ceil(product.rating)) {
                stars.push(<i key={i} className="fas fa-star-half-alt" style={{ color: "gold" }}></i>);
            } else {
                stars.push(<i key={i} className="far fa-star" style={{ color: "gold" }}></i>);
            }
        }
        return stars;
    };

    const [showSuccessTick, setShowSuccessTick] = useState(false);

    // Function to add product to basket
    const addToBasket = async () => {
        const userId = localStorage.getItem('userid');
        const token = localStorage.getItem('token');

        // Prepare the product to be added to the basket
        const basketItem = {
            productId: product.id,
            quantity: 1
        };

        if (userId && token) {
            // User is logged in, add to basket in backend
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/basket/${userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${token}`
                    },
                    body: JSON.stringify(basketItem)
                });

                if (!response.ok) {
                    throw new Error('Failed to add item to basket');
                }

                setShowSuccessTick(true);
                setTimeout(() => {
                    setShowSuccessTick(false);
                }, 1000); // Show the tick for 1 second
                updateCartItemCount();

            } catch (error) {
                console.error('Error adding item to basket:', error);
            }
        } else {
            // User is not logged in, add to basket in local storage
            const basket = JSON.parse(localStorage.getItem('basket')) || [];
            const existingItemIndex = basket.findIndex(item => item.productId === product.id);

            if (existingItemIndex !== -1) {
                // If product is already in basket, increase quantity
                basket[existingItemIndex].quantity += 1;
            } else {
                // If product is not in basket, add it
                basket.push(basketItem);
            }

            localStorage.setItem('basket', JSON.stringify(basket));
            setShowSuccessTick(true);
            setTimeout(() => {
                setShowSuccessTick(false);
            }, 1000); 
            updateCartItemCount();
        }
    };

    return (
        <div className="product-page">
            <div className="product-page-top">
                <div className="product-image-container">
                    <img src={product.imageUrl} alt={product.name} className="product-image" />
                </div>
                <div className="product-info-container">
                    <h1 className="product-title"><strong>{product.brand}</strong> {product.name}</h1>
                    <div className="product-rating">
                        {renderStars()}
                        <span className="product-reviews-count">({product.reviewsCount} Değerlendirme)</span>
                    </div>
                    <div className="product-price">{product.price} TL</div>
                    <div className="product-actions">
                        {showSuccessTick ? (
                            <button className="add-to-cart-btn">
                                <i className="fas fa-check" style={{ color: 'white' }}></i>
                            </button>
                        ) : (
                            <button className="add-to-cart-btn" onClick={addToBasket}>
                                <i className="fas fa-shopping-cart"></i> Sepete Ekle
                            </button>
                        )}
                        <button className={`favorite-btn ${isFavorite ? 'active' : ''}`} onClick={toggleFavorite}>
                            <i className={`fas fa-heart`}></i>
                        </button>
                    </div>
                    <div className="product-fast-shipping">
                        <i className="fas fa-shipping-fast"></i> {fastShippingTime} içinde sipariş verirsen en geç yarın kargoda!
                    </div>
                    <div className="product-description">
                        <div className="product-id">
                            <i className="fas fa-info-circle"></i> Bu ürünün ID bilgisi: {product.id}
                        </div>
                        <div className="product-id">
                            <i className="fas fa-info-circle"></i> Ürünün markası {product.brand} olarak kaydedilmiştir.
                        </div>
                        <div className="product-id">
                            <i className="fas fa-info-circle"></i> Ürün {product.name} ismiyle satılmaktadır.
                        </div>
                        <div className="product-id">
                            <i className="fas fa-info-circle"></i> {product.soldCount} kişi bu ürünü satın aldı.
                        </div>
                        <div className="product-id">
                            <i className="fas fa-info-circle"></i> {product.reviewsCount} kişi bu ürünü değerlendirdi.
                        </div>
                    </div>
                    {/* Add other product details */}
                </div>
            </div>
            <div className="product-page-bottom">
                {/* Reviews */}
            </div>
        </div>
    );
};

export default Product;
