import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './Cards.css';

const Cards = ({cards}) => {

  const navigate = useNavigate();
  const handleCardClick = (categoryName) => {
    navigate(`/search/${categoryName.toLowerCase()}`); 
  };

  return (
    <div className="cards-container">
      {cards.length > 0 ? (
        cards.map((card) => (
          <div key={card.id} className="card" onClick={() => handleCardClick(card.search)}>
            <img src={card.imageUrl} alt={card.title} className="card-image" />
            <div className="card-title">{card.title}</div>
          </div>
        ))
      ) : (
        <div>Loading cards...</div>
      )}
    </div>
  );
};

export default Cards;
