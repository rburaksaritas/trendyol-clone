import React, { useState } from 'react';
import './Navbar.css';
import logo_main from '../assets/logo_main.svg';

const Navbar = ({ isLoggedIn, cartItemCount }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isAccountDropdownVisible, setIsAccountDropdownVisible] = useState(false);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        console.log('Searching for:', searchTerm);
        // Implement your search logic here
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <img src={logo_main} alt="Logo" className="navbar-logo" />
            </div>

            <form className="search-form" onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    className="search-input"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Ara..."
                />
                <button type="submit" className="search-button">
                    <i className='fas fa-search'></i>
                </button>
            </form>

            <div className="navbar-links">
                {/* Account Link and Dropdown */}
                <div
                    className="account-dropdown"
                    onMouseEnter={() => setIsAccountDropdownVisible(true)}
                    onMouseLeave={() => setIsAccountDropdownVisible(false)}
                >
                    <a href={isLoggedIn ? "/account" : "/login"}>
                        <i className="fas fa-user"></i> {isLoggedIn ? "Hesabım" : "Giriş Yap"}
                    </a>
                    {isAccountDropdownVisible && (
                        <div className="dropdown">
                            {isLoggedIn ? (
                                // Dropdown content for logged-in users
                                <>
                                    <a href="/profile"><i className="fas fa-user"></i> Profilim</a>
                                    <a href="/orders"><i className="fas fa-box"></i> Siparişlerim</a>
                                    <a href="/logout"><i className="fas fa-right-from-bracket"></i> Çıkış Yap</a>
                                </>
                            ) : (
                                // Dropdown content for guests
                                <>
                                    <a href="/login">Giriş Yap</a>
                                    <a href="/signup">Üye Ol</a>
                                </>
                            )}
                        </div>
                    )}
                </div>

                <a href="/favorites">
                    <i className="fas fa-heart"></i> Favorilerim
                </a>
                <div className="cart-item-count">
                    <a href="/cart">
                        <i className="fas fa-shopping-cart"></i> Sepetim
                    </a>
                    {cartItemCount > 0 && (
                        <span className="cart-count">{cartItemCount}</span> // This span will display the cart count
                    )}
                </div>


            </div>
        </nav>
    );
};

export default Navbar;
