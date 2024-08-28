import React, { useState, useEffect, useCallback } from 'react';
import '../index.css';
import xSymbol from '../images/x-symbol.svg';
import oSymbol from '../images/o-symbol.svg';
import xIcon from '../images/cat_avatar.png';
import oIcon from '../images/cat_avatar.png';

const Board = () => {
    const initialBoard = Array(9).fill(null);
    const [board, setBoard] = useState(initialBoard);
    const [isXNext, setIsXNext] = useState(true);
    const [rotationAngle, setRotationAngle] = useState(0);
    const [timeLeftX, setTimeLeftX] = useState(30);
    const [timeLeftO, setTimeLeftO] = useState(30);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    // Timer logic
    useEffect(() => {
        const timer = setInterval(() => {
            if (isXNext) {
                setTimeLeftX((prev) => (prev > 0 ? prev - 1 : 30));
            } else {
                setTimeLeftO((prev) => (prev > 0 ? prev - 1 : 30));
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [isXNext]);

    const handleClick = (index) => {
        if (board[index]) return;

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
                className={`relative flex items-center justify-center w-32 h-32 ${
                    (index < 3 || index < 6) ? 'border-b-4 border-white' : '' // Rows
                } ${
                    index % 3 !== 2 ? 'border-r-4 border-white' : '' // Middle columns
                }`}
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

    const handleSubmitMessage = () => {
        if (newMessage.trim() === '') return;
        setMessages([...messages, { text: newMessage, fromMe: !isXNext }]);
        setNewMessage('');
    };

    // Handle Enter key press
    const handleKeyDown = useCallback(
        (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                handleSubmitMessage();
            }
        },
        [newMessage, isXNext]
    );

    return (
        <div className="relative h-screen w-screen bg-primary flex items-center justify-center">
            <div className="flex space-x-8">
                {/* Board with Player Info */}
                <div className="relative bg-primaryLight bg-opacity-40 backdrop-blur-lg p-8 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-2">
                            <img src={xIcon} alt="Player X" className="w-10 h-10" />
                            <span className="text-white font-bold">{timeLeftX}s</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <img src={oIcon} alt="Player O" className="w-10 h-10" />
                            <span className="text-white font-bold">{timeLeftO}s</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-0 w-[384px] h-[384px] border border-primaryLight bg-primaryLighter bg-opacity-20 backdrop-blur-md">
                        {Array(9)
                            .fill(null)
                            .map((_, index) => renderSquare(index))}
                    </div>
                </div>

                {/* Chat Board */}
                <div className="flex flex-col bg-primaryLight bg-opacity-40 backdrop-blur-lg p-6 rounded-lg shadow-lg w-80 h-96">
                    <div className="text-white font-bold mb-4">Chat Board</div>
                    <div className="flex-1 overflow-y-auto mb-4">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'} mb-2`}
                            >
                                <div
                                    className={`px-4 py-2 rounded-lg ${
                                        msg.fromMe
                                            ? 'bg-secondary text-white'
                                            : 'bg-white text-primary'
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type a message..."
                            className="flex-1 p-2 bg-white bg-opacity-60 text-primary rounded-l-md"
                        />
                        <button
                            onClick={handleSubmitMessage}
                            className="p-2 bg-secondary text-white rounded-r-md"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Board;
