// Board.jsx
import React, { useEffect, useState } from 'react';
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
  const [isMatching, setIsMatching] = useState(false);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);


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

    const withClick = (id) => {
      setShuffle((prev) => {
        const updatedCards = prev.map((card) => {
          if (card.id === id && !card.found && !card.flipCard && flippedCards.length < 2) {
            return { ...card, flipCard: true };
          }
          return card;
        });
  
        // console.log('updatedCards', updatedCards)
        const currentFlippedCards = updatedCards.filter((card) => card.flipCard && !card.found);
  
        let cardlength = currentFlippedCards.length;
        console.log('length', cardlength)
        
        if (cardlength %2 === 0) {
          let [firstCard, secondCard] = [];
          if (cardlength > 2) {
            firstCard = currentFlippedCards[cardlength-2]
            secondCard = currentFlippedCards[cardlength-1];
          }
          else {
            firstCard = currentFlippedCards[0]
            secondCard = currentFlippedCards[1];
          }
          console.log('firstCard', firstCard);
          console.log('secondCard', secondCard);

          if (firstCard.cardFront === secondCard.cardFront) {
            // Store matched pairs
            setMatchedPairs([firstCard, secondCard])
            setWinning((prev) => prev + 1);
            const allFound = updatedCards.every((card) => card.found);
            if (allFound) {
              console.log('Game finished');
              setFlippedCards([]);
            }
          } else {
            setTimeout(() => {
              const updatedCards = prev.map((card) => {
                if (card.id !== firstCard.id || card.id !== secondCard.id) {
                  return { ...card, flipCard: false };
                }
                return card;
              });
              // setShuffle((prev) => {
              //   console.log('prev',prev);

              //   const flippedBack = prev.map((card) => {
              //     if (card.id === firstCard.id) {
              //       card.flipCard = false
              //     }
              //     if (card.id === secondCard.id) {
              //       card.flipCard = false
              //     }
              //     if (flippedCards.includes(card.id) || matchedPairs.includes(card.cardFront)) {
              //       return { ...card, flipCard: false };
              //     }
              //     console.log('card',card);
              //     return card;
              //   });
              //   setFlippedCards([]);
              //   console.log('flippedBack',flippedBack);
              //   return flippedBack;
              // });
            }, 900);
          }
        }
        // } else {
        //   setFlippedCards((prev) => [...prev, currentFlippedCards[0].id]);
        // }
        
        // else if (currentFlippedCards.length === 1) {
        //   setFlippedCards((prev) => [...prev, currentFlippedCards[0].id]);
        // } else {
        //   setFlippedCards([]);
        // }
  
        return updatedCards;
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
