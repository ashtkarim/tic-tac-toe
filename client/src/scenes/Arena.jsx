import React from 'react';
import Board from "../components/board.jsx";

function Arena({ setTitle }) {
  setTitle('How you will beat today :)');

  return (
    <div>
      <Board />
    </div>
  )
}

export default Arena;
