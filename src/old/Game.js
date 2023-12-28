// App.js
import React from 'react';
import Board from './Board';
import './Game.css';

const Game = () => {
  return (
    <div className='main'>
      <h1>Ghibli Memory Game</h1>
      <Board />
    </div>
  );
};

export default Game;
