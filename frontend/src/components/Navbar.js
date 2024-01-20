import React, { useState } from 'react';
import { Link, BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo_main from '../assets/logo_main.svg';

const Navbar = ({ isLoggedIn, cartItemCount, onLogout, updateCartItemCount }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isAccountDropdownVisible, setIsAccountDropdownVisible] = useState(false);

    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        navigate(`/search/${searchTerm}`);
        setSearchTerm("");
    };

    const handleLogoutClick = () => {
        onLogout();
        localStorage.removeItem('token');
        localStorage.removeItem('userid');
        localStorage.removeItem('username');
        updateCartItemCount();
    };

    const navigateTo = (path) => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            navigate(path);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">
                    <img src={logo_main} alt="Logo" className="navbar-logo" />
                </Link>
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
                    <Link to={isLoggedIn ? "/profile" : "/login"}>
                        <i className="fas fa-user"></i> {isLoggedIn ? "Hesabım" : "Giriş Yap"}
                    </Link>
                    {isAccountDropdownVisible && (
                        <div className="dropdown">
                            {isLoggedIn ? (
                                // Dropdown content for logged-in users
                                <>
                                    <Link to="/profile"><i className="fas fa-user"></i> Profilim</Link>
                                    <Link to="/orders"><i className="fas fa-box"></i> Siparişlerim</Link>
                                    <Link to="/login" onClick={ handleLogoutClick }><i className="fas fa-right-from-bracket"></i> Çıkış Yap</Link>
                                </>
                            ) : (
                                // Dropdown content for guests
                                <>
                                    <Link to="/login">Giriş Yap</Link>
                                    <Link to="/register">Üye Ol</Link>
                                </>
                            )}
                        </div>
                    )}
                </div>

                <Link to="/favorites" onClick={(e) => { e.preventDefault(); navigate('/favorites'); }}>
                    <i className="fas fa-heart"></i> Favorilerim
                </Link>
                <div className="cart-item-count">
                    <Link to="/cart" onClick={(e) => { e.preventDefault(); navigateTo('/cart'); }}>
                        <i className="fas fa-shopping-cart"></i> Sepetim
                    </Link>
                    {cartItemCount > 0 && (
                        <span className="cart-count">{cartItemCount}</span>
                    )}
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
