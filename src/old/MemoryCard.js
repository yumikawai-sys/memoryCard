// MemoryCard.jsx
import React from 'react';
import backside from './img/backside.jpg';
import './Memory.css'

const MemoryCard = ({ card, onClick }) => {
  return (
    <div
      className="memory-card"
      style={{
        backgroundImage: card.flipCard ? `url(${card.cardFront})` : `url(${backside})`,
      }}
      onClick={() => onClick(card.id)}
    ></div>
  );
};

export default MemoryCard;
