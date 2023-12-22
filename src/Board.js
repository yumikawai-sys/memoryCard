// Board.jsx
import React, { useEffect, useRef, useState } from 'react';
import MemoryCard from './MemoryCard';
import './Board.css';
import aCard from './img/aCard.jpg';
import bCard from './img/bCard.jpg';
import cCard from './img/cCard.jpg';
import dCard from './img/dCard.jpg';
import eCard from './img/eCard.jpg';
import fCard from './img/fCard.jpg';
import gCard from './img/gCard.jpg';
import hCard from './img/hCard.jpg';
import iCard from './img/iCard.jpg';
import jCard from './img/jCard.jpg';

const Movements = ({ total: cardAnimation, setMoves, setShuffle }) => {
  return (
    <div className="movements">
      <div>Movements: {cardAnimation}</div>
      <button
        onClick={() => {
          setShuffle((prev) => {
            const newMemoryCards = prev.map((MemoryCard) => ({
              ...MemoryCard,
              flipCard: false,
              found: false,
            }));
            newMemoryCards.sort(() => Math.random() - 0.3);
            return newMemoryCards;
          });
        }}
      >
        Reset game
      </button>
    </div>
  );
};

const Board = () => {
  const [winGame, setWinning] = useState(false);
  const [moves, setMoves] = useState(0);
  const [shuffle, setShuffle] = useState([
    { id: 1, cardFront: aCard, flipCard: true },
    { id: 2, cardFront: bCard, flipCard: true },
    { id: 3, cardFront: cCard, flipCard: true },
    { id: 4, cardFront: dCard, flipCard: true },
    { id: 5, cardFront: eCard, flipCard: true },
    { id: 6, cardFront: fCard, flipCard: true },
    { id: 7, cardFront: gCard, flipCard: true },
    { id: 8, cardFront: hCard, flipCard: true },
    { id: 9, cardFront: iCard, flipCard: true },
    { id: 10, cardFront: jCard, flipCard: true },
    { id: 11, cardFront: aCard, flipCard: true }, 
    { id: 12, cardFront: bCard, flipCard: true }, 
    { id: 13, cardFront: cCard, flipCard: true }, 
    { id: 14, cardFront: dCard, flipCard: true }, 
    { id: 15, cardFront: eCard, flipCard: true }, 
    { id: 16, cardFront: fCard, flipCard: true }, 
    { id: 17, cardFront: gCard, flipCard: true }, 
    { id: 18, cardFront: hCard, flipCard: true }, 
    { id: 19, cardFront: iCard, flipCard: true }, 
    { id: 20, cardFront: jCard, flipCard: true }, 
  ]);

  const beginning = useRef(null);

  const withClick = (id) => {
    setShuffle((prev) => {
      const beforeCard = [...prev];
      const cardResult = prev.find((card) => card.id === id);
      if (cardResult.found) return beforeCard;
      cardResult.flipCard = !cardResult.flipCard;
      if (beginning.current === null) {
        beginning.current = cardResult;
        return beforeCard;
      } else {
        if (beginning.current.cardFront === cardResult.cardFront && beginning.current.id !== cardResult.id) {
          beginning.current.found = true;
          cardResult.found = true;

          console.log('Match');
          console.log(beforeCard);
          const winGame = beforeCard.every((card) => card.found);
          if (winGame) {
            setWinning(true);
          }
        } else {
          const flipAgain = beginning.current.id;
          setTimeout(() => {
            flips(flipAgain, cardResult.id);
          }, 900);
        }
        beginning.current = null;
      }
      return beforeCard;
    });
  };

  const flips = (id_1, id_2) => {
    setShuffle((prev) => {
      const newOne = [...prev];
      newOne.forEach((i) => {
        if (i.id === id_1 || i.id === id_2) {
          i.flipCard = false;
        }
      });
      setMoves((prev) => prev + 1);
      return newOne;
    });
  };

  useEffect(() => {
    setShuffle((prev) => {
      const newCards = prev.map((card) => ({ ...card, flipCard: false, found: false }));
      newCards.sort(() => Math.random() - 0.3);
      return newCards;
    });
  }, []);

  return (
    <div>
      <Movements total={moves} setShuffle={setShuffle} />
      {winGame && <div>Game finished</div>}
      <div className="board">
        {shuffle.map((card) => (
          <MemoryCard key={card.id} card={card} onClick={withClick} />
        ))}
      </div>
    </div>
  );
};

export default Board;
