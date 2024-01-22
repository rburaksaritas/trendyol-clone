import React, { useState, useEffect } from 'react';
import BasketItem from './BasketItem';
import './Basket.css';

const Basket = ({ updateCartItemCount }) => {
    const [basketItems, setBasketItems] = useState([]);
    const [basketDetails, setBasketDetails] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [shippingCost, setShippingCost] = useState(0);
    const [discount, setDiscount] = useState(0);
    const userId = localStorage.getItem('userid');
    const token = localStorage.getItem('token');
    const basketUrl = userId && token ? `${process.env.REACT_APP_BACKEND_URL}/basket/${userId}` : null;

    // Function to fetch product details
    const fetchProductDetails = async (productId) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products/${productId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }
        return response.json();
    };

    // Function to fetch basket items from local storage
    const fetchBasketFromLocalStorage = () => {
        return JSON.parse(localStorage.getItem('basket')) || [];
    };

    useEffect(() => {
        const fetchBasket = async () => {
            let basketData = [];

            if (userId && token) {
                const response = await fetch(basketUrl, {
                    headers: { 'Authorization': `Basic ${token}` }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch basket');
                }
                const data = await response.json();
                basketData = data.items;
            } else {
                basketData = fetchBasketFromLocalStorage();
            }

            const detailsPromises = basketData.map(item =>
                fetchProductDetails(item.productId).then(product => ({
                    ...item,
                    productDetails: product,
                }))
            );

            const details = await Promise.all(detailsPromises);
            setBasketDetails(details);

            // Calculate total price
            const calculatedTotalPrice = details.reduce((total, item) => {
                return total + (item.productDetails.price * item.quantity);
            }, 0);

            // Calculate shipping cost based on the number of items
            let newShippingCost = basketData.length === 0 ? 0 : 34.99 + (basketData.length - 1) * 5;

            // Calculate discount if the total price exceeds 500
            let newDiscount = calculatedTotalPrice > 500 ? newShippingCost : 0;

            setTotalPrice(calculatedTotalPrice);
            setShippingCost(newShippingCost); // Apply discount to shipping cost if applicable
            setDiscount(newDiscount);
            setBasketItems(basketData);
            updateCartItemCount(basketData.length);
        };

        fetchBasket();
    }, [userId, token, basketUrl, updateCartItemCount]);

    const handleQuantityChange = (productId, quantity) => {
        if (userId && token) {
            // Update basket item quantity in backend
            fetch(`${basketUrl}/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${token}`,
                },
                body: JSON.stringify({ quantity, isActive: true }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setBasketItems(data.items);
                    updateCartItemCount(data.items.length); // Update cart item count
                })
                .catch((error) => console.error('Error updating basket item:', error));
        } else {
            // Update quantity in local storage for guests
            let updatedBasket;
            if (quantity < 1) {
                // Remove the item if the quantity is less than 1
                updatedBasket = basketItems.filter((item) => item.productId !== productId);
            } else {
                // Otherwise, update the quantity
                updatedBasket = basketItems.map((item) =>
                    item.productId === productId ? { ...item, quantity } : item
                );
            }
            localStorage.setItem('basket', JSON.stringify(updatedBasket));
            setBasketItems(updatedBasket);
            updateCartItemCount(updatedBasket.length); // Update cart item count
        }
    };

    const handleRemoveItem = (productId) => {
        if (userId && token) {
            // Remove item from backend
            fetch(`${basketUrl}/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Basic ${token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setBasketItems(data.items);
                    updateCartItemCount(data.items.length); // Update cart item count
                })
                .catch((error) => console.error('Error removing basket item:', error));
        } else {
            // Remove item from local storage for guests
            const updatedBasket = basketItems.filter((item) => item.productId !== productId);
            localStorage.setItem('basket', JSON.stringify(updatedBasket));
            setBasketItems(updatedBasket);
            updateCartItemCount(updatedBasket.length); // Update cart item count
        }
    };

    const handleClearBasket = () => {
        if (userId && token) {
            // Clear basket in backend
            fetch(`${basketUrl}/clear/${userId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then(() => {
                    setBasketItems([]);
                    updateCartItemCount(0); // Update cart item count
                })
                .catch((error) => console.error('Error clearing basket:', error));
        } else {
            // Clear local storage for guests
            localStorage.removeItem('basket');
            setBasketItems([]);
            updateCartItemCount(0); // Update cart item count
        }
    };

    return (
        <div className="basket">
            <h2>Sepetim</h2>
            <div className='basket-wrapper'>
                <div className="basket-items">
                    {basketDetails.map((item) => (
                        <BasketItem
                            key={item.productId}
                            item={item}
                            onQuantityChange={handleQuantityChange}
                            onRemoveItem={handleRemoveItem}
                        />
                    ))}
                </div>
                <div className="basket-right">
                    <div className="basket-summary">
                        <h3>Sipariş Özeti</h3>
                        <div className="summary-item">
                            <span>Toplam Fiyat</span>
                            <span>{totalPrice.toFixed(2)} TL</span>
                        </div>
                        <div className="summary-item">
                            <span>Kargo Toplam</span>
                            <span>{shippingCost.toFixed(2)} TL</span>
                        </div>
                        {discount > 0 && (
                            <div className="summary-item discount">
                                <span>500 TL Üstü Kargo Bedava</span>
                                <span>-{discount.toFixed(2)} TL</span>
                            </div>
                        )}
                        <div className="summary-item total">
                            <span>Toplam</span>
                            <span>{(totalPrice + shippingCost - discount).toFixed(2)} TL</span>
                        </div>
                    </div>
                    <button className="checkout-btn">Sepeti Onayla</button>
                </div>
            </div>
        </div>
    );
};

export default Basket;