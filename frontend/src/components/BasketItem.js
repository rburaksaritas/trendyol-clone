import React from 'react';
import './BasketItem.css';

const BasketItem = ({ item, onQuantityChange, onRemoveItem }) => {
    const { productDetails, quantity } = item;

    // Handle the quantity change
    const handleQuantityChange = (newQuantity) => {
        onQuantityChange(item.productId, newQuantity);
    };

    // Handle item removal
    const handleRemoveClick = () => {
        onRemoveItem(item.productId);
    };

    return (
        <div className="basket-item">
            <div className="basket-item-image">
                <img src={productDetails.imageUrl} alt={productDetails.name} />
            </div>
            <div className="basket-item-details">
                <p className="basket-item-brand">{productDetails.brand}</p>
                <h4 className="basket-item-title">{productDetails.name}</h4>
                <p className="basket-item-delivery">Tahmini teslimat: 2 gün</p>
            </div>
            <div className="basket-item-quantity">
                <button onClick={() => handleQuantityChange(quantity - 1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
            </div>
            <div className="basket-item-price">
                {(productDetails.price * quantity).toFixed(2)} TL
            </div>
            <div className="basket-item-remove" onClick={handleRemoveClick}>
                <i className="fas fa-trash"></i>
            </div>
        </div>
    );
};

export default BasketItem;
