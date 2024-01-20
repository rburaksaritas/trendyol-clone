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
            <div className="footer-bottom">
                <p>This application is created solely for educational and developmental purposes and does not have any affiliation, endorsement, or official connection with Trendyol or any of its subsidiaries or affiliates. The content and functionality here are intended to demonstrate the capabilities in programming and application development using technologies such as Kotlin, Spring Boot, Couchbase, and React. The official Trendyol website, which is the primary source of the data used in this application, can be found at www.trendyol.com. It is important to note that this project is an independent endeavor aimed at enhancing and showcasing the developer's skills and is not intended for commercial exploitation or as a substitute for the services provided by Trendyol.</p>
                <p>The information and data available on this application, including but not limited to product descriptions, images, and prices, have been meticulously collected from publicly available sources and are utilized here purely for demonstration and educational purposes. These data elements are pivotal in providing a realistic and interactive user experience, mimicking the functionalities of an e-commerce platform. However, it is crucial to understand that these data are not intended for commercial use and do not represent actual market offerings, prices, or products available for purchase. The intention behind the use of such data is to create a realistic environment for development and learning, without any commercial intent or implication.</p>
                <p>In developing this application, the developer respectfully acknowledges that all data sourced from Trendyol, including but not limited to product details and images, are the intellectual property of Trendyol and its respective copyright holders. The developer makes no claims of ownership of these data and recognizes the importance of intellectual property rights. This project is purely non-commercial and is designed to showcase a range of programming skills and techniques in a practical and engaging manner. The developer is committed to ethical practices in software development and maintains a strong stance against any form of copyright infringement.</p>
                <p>It is imperative to state that any use of the data or functionalities provided within this application should be confined strictly within the scope of this project. Utilization of the data for purposes beyond the educational and developmental scope of this project is strictly prohibited and must be in compliance with the original terms and conditions set forth by Trendyol. Users and developers are advised to respect the legal boundaries and ethical considerations associated with using third-party data, especially when such data is integral to the business and operations of the original rights holders.</p>

            </div>
        </div>
    );
};

export default Footer;
