import React from 'react';
import { useLocation } from 'react-router-dom';
import './Product.css';

const Product = () => {
    const location = useLocation();
    const { product } = location.state;

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
                        <button className="add-to-cart-btn">
                            <i className="fas fa-shopping-cart"></i> Sepete Ekle
                        </button>
                        <button className="favorite-btn">
                            <i className={`fas fa-heart ${product.isFavorite ? 'active' : ''}`}></i>
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