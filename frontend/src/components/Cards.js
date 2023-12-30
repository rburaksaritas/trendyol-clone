import React, { useState, useEffect } from 'react';
import './Cards.css';

const Cards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cards`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchCards();
  }, []);

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
