import { useState, useEffect } from 'react';
import Card from './Card';
import './Game.css';

const cardImages = [
    { id: 0, src: '/img/aCard.jpg' },
    { id: 1, src: '/img/bCard.jpg' },
    { id: 2, src: '/img/cCard.jpg' },
    { id: 3, src: '/img/dCard.jpg' },
    { id: 4, src: '/img/eCard.jpg' },
    { id: 5, src: '/img/fCard.jpg' },
    { id: 6, src: '/img/gCard.jpg' },
    { id: 7, src: '/img/hCard.jpg' },
    { id: 8, src: '/img/iCard.jpg' },
    { id: 9, src: '/img/jCard.jpg' },
  ];
  
  const Game = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [moves, setMoves] = useState(0);
  
    useEffect(() => {
      const duplicatedCards = [...cardImages, ...cardImages];
      const shuffledCards = duplicatedCards.sort(() => Math.random() - 0.5);
      setCards(shuffledCards.slice(0, 20)); // Take only the first 20 cards
    }, []);
  
  
    const handleCardClick = (id) => {
      // Cannot open the 2 cards at the same time
      if (flippedCards.length === 2) {
        return;
      }
      
      // Cannot open the same card
      if (flippedCards.includes(id)) {
        return;
      }
  
      // Now meaning a new card is clicked!
      setFlippedCards([...flippedCards, id]);
  
      if (flippedCards.length === 1) {
        setMoves((prevMoves) => prevMoves + 1);
  
        if (cards[flippedCards[0]].src === cards[id].src) {
          setMatchedPairs([...matchedPairs, cards[flippedCards[0]].src, cards[id].src]);
          setFlippedCards([]);
        } else {
          setTimeout(() => {
            setFlippedCards([]);
          }, 1000);
        }
      }
    };
  
    const isCardFlipped = (id) => flippedCards.includes(id);
  
    const isCardMatched = (src) => matchedPairs.includes(src);
  
    return (
      <div className="card-grid">
        {cards.map((card, index) => (
          <Card
            key={index}
            id={index}
            src={card.src}
            isFlipped={isCardFlipped(index)}
            isMatched={isCardMatched(card.src)}
            onClick={handleCardClick}
          />
        ))}
        <div className="moves">Moves: {moves}</div>
      </div>
    );
  };
  
  export default Game;