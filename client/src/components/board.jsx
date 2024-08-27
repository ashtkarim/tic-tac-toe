import React, { useState } from 'react';
import '../index.css';
import xSymbol from '../images/x-symbol.svg';
import oSymbol from '../images/o-symbol.svg';

const Board = () => {
    const initialBoard = Array(9).fill(null);
    const [board, setBoard] = useState(initialBoard);
    const [isXNext, setIsXNext] = useState(true);
    const [rotationAngle, setRotationAngle] = useState(0);

    const handleClick = (index) => {
        if (board[index]) return; // Ignore clicks on already filled squares

        const newBoard = [...board];
        newBoard[index] = isXNext ? 'x' : 'o';
        setBoard(newBoard);
        setIsXNext(!isXNext);
        setRotationAngle(rotationAngle === 360 ? 0 : 360);
    };

    const renderSquare = (index) => {
        const symbol = board[index];
        const symbolImage = symbol === 'x' ? xSymbol : oSymbol;
        return (
            <div
                key={index}
                className="relative flex items-center justify-center p-4 border border-white"
                onClick={() => handleClick(index)}
            >
                {symbol && (
                    <img
                        src={symbolImage}
                        alt={`${symbol} symbol`}
                        className="transform"
                        style={{ transform: `rotate(${rotationAngle}deg)` }}
                    />
                )}
            </div>
        );
    };

    return (
        <div className="relative h-screen w-screen bg-primary flex flex-col items-center justify-center">
            <div className="grid grid-cols-3 gap-0 w-80 h-80">
                {Array(9)
                    .fill(null)
                    .map((_, index) => renderSquare(index))}
            </div>
        </div>
    );
};

export default Board;
