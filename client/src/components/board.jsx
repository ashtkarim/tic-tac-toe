import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'; // Ensure you have Tailwind directives in this file or import Tailwind CSS directly
import xSymbol from '../images/x-symbol.svg';
import oSymbol from '../images/o-symbol.svg';
import xIcon from '../images/cat_avatar.png';
import oIcon from '../images/cat_avatar.png';

const Board = () => {
    const initialBoard = Array(9).fill(null);
    const [board, setBoard] = useState(initialBoard);
    const [isXNext, setIsXNext] = useState(true);
    const [timeLeftX, setTimeLeftX] = useState(30);
    const [timeLeftO, setTimeLeftO] = useState(30);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [winner, setWinner] = useState(null);
    const [winningLine, setWinningLine] = useState([]);
    const [showPopup, setShowPopup] = useState(false); // For confirmation popup
    const navigate = useNavigate();

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

    useEffect(() => {
        const checkWinner = () => {
            const lines = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];

            for (let i = 0; i < lines.length; i++) {
                const [a, b, c] = lines[i];
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    setWinner(board[a]);
                    setWinningLine([a, b, c]);
                    return;
                }
            }

            if (!board.includes(null)) {
                setWinner('Draw');
            }
        };

        checkWinner();
    }, [board]);

    const handleClick = (index) => {
        if (board[index] || winner) return;

        const newBoard = [...board];
        newBoard[index] = isXNext ? 'x' : 'o';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const handlePlayAgain = () => {
        setBoard(initialBoard);
        setIsXNext(true);
        setTimeLeftX(30);
        setTimeLeftO(30);
        setWinner(null);
        setWinningLine([]);
        setMessages([]);
    };

    const handleLeave = () => {
        setShowPopup(true);
    };

    const handleConfirmLeave = () => {
        navigate('/');
    };

    const handleCancelLeave = () => {
        setShowPopup(false);
    };

    const renderSquare = (index) => {
        const symbol = board[index];
        const symbolImage = symbol === 'x' ? xSymbol : oSymbol;
        const isWinningSquare = winningLine.includes(index);

        return (
            <div
                key={index}
                className={`flex items-center justify-center border ${
                    isWinningSquare ? 'bg-yellow-200' : ''
                } w-full h-full cursor-pointer`}
                onClick={() => handleClick(index)}
            >
                {symbol && (
                    <img
                        src={symbolImage}
                        alt={`${symbol} symbol`}
                        className="w-12 h-12" // Increased size for larger symbols
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
        <div className="min-h-screen w-full bg-primary flex items-center justify-center p-4">
            <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 w-full max-w-6xl">
                {/* Board with Player Info */}
                <div className="relative bg-primaryLight bg-opacity-40 backdrop-blur-lg p-8 rounded-lg shadow-lg flex-1 flex flex-col items-center justify-center">
                    <div className="flex justify-between items-center mb-4 absolute top-4 left-4 right-4">
                        <div className="flex items-center space-x-2">
                            <img src={xIcon} alt="Player X" className="w-8 h-8 md:w-10 md:h-10" />
                            <span className="text-white font-bold">{timeLeftX}s</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <img src={oIcon} alt="Player O" className="w-8 h-8 md:w-10 md:h-10" />
                            <span className="text-white font-bold">{timeLeftO}s</span>
                        </div>
                    </div>
                    <div className="relative grid grid-cols-3 grid-rows-3 gap-2 w-[400px] h-[400px] border border-primaryLight bg-primaryLighter bg-opacity-20 backdrop-blur-md">
                        {Array(9).fill(null).map((_, index) => renderSquare(index))}
                    </div>
                    {winner && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl font-bold">
                            {winner === 'Draw' ? 'Draw!' : `Player ${winner.toUpperCase()} Wins!`}
                        </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                        <button
                            onClick={handlePlayAgain}
                            className="px-4 py-2 bg-secondary text-white rounded-md shadow-md hover:bg-secondaryLight"
                        >
                            Play Again
                        </button>
                        <button
                            onClick={handleLeave}
                            className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
                        >
                            Leave
                        </button>
                    </div>
                </div>

                {/* Chat Board */}
                <div className="flex flex-col bg-primaryLight bg-opacity-40 backdrop-blur-lg p-6 rounded-lg shadow-lg w-full md:w-96 h-96">
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
                            className="flex-1 px-4 py-2 border rounded-lg"
                        />
                        <button
                            onClick={handleSubmitMessage}
                            className="px-4 py-2 bg-secondary text-white rounded-lg ml-2"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>

            {/* Confirmation Popup */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-bold mb-4">Are you sure you want to leave?</h2>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={handleConfirmLeave}
                                className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
                            >
                                Yes
                            </button>
                            <button
                                onClick={handleCancelLeave}
                                className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Board;
