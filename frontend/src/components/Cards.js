import React, { useState, useEffect } from 'react';
import './Cards.css';

const Cards = ({cards}) => {

  return (
    <div className="cards-container">
      {cards.length > 0 ? (
        cards.map((card) => (
          <div key={card.id} className="card" onClick={() => console.log('Card clicked!', card)}>
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
