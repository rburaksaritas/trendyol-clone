import React from 'react';
import './Footer.css'
import logo_light from '../assets/logo_light.svg';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-top">
                <div className="footer-left">
                    <img src={logo_light} alt="Logo" className="footer-logo" />
                </div>
                <div className="footer-right">
                    <a href='https://linkedin.com/in/rburaksaritas' target="_blank" rel="noopener noreferrer">Linkedin</a>
                    <a href='https://github.com/rburaksaritas' target="_blank" rel="noopener noreferrer">Github</a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
