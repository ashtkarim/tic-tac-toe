import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'; // Ensure you have Tailwind directives in this file or import Tailwind CSS directly
import xSymbol from '../images/x-symbol.svg';
import oSymbol from '../images/o-symbol.svg';
import xIcon from '../images/cat_avatar.png';
import oIcon from '../images/cat_avatar.png';

const RobotBoard = () => {
    const initialBoard = Array(9).fill(null);
    const [board, setBoard] = useState(initialBoard);
    const [isXNext, setIsXNext] = useState(true);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true); // New state to track if it's player's turn
    const [timeLeftX, setTimeLeftX] = useState(30);
    const [timeLeftO, setTimeLeftO] = useState(30);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [winner, setWinner] = useState(null);
    const [winningLine, setWinningLine] = useState([]);
    const [showPopup, setShowPopup] = useState(false); // For confirmation popup
    const [playerSymbol, setPlayerSymbol] = useState(null); // State for player's symbol
    const [botSymbol, setBotSymbol] = useState(null); // State for bot's symbol
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

    useEffect(() => {
        if (!isPlayerTurn && !winner) {
            const timeout = setTimeout(() => botMove(), 1000); // Simulate bot thinking time
            return () => clearTimeout(timeout);
        }
    }, [isPlayerTurn, board, winner]);

    const handleClick = (index) => {
        if (board[index] || winner || !isPlayerTurn || !playerSymbol) return;

        const newBoard = [...board];
        newBoard[index] = playerSymbol; // Player's chosen symbol
        setBoard(newBoard);
        setIsXNext(false);
        setIsPlayerTurn(false); // Switch to bot's turn
    };

    const handlePlayAgain = () => {
        setBoard(initialBoard);
        setIsXNext(true);
        setIsPlayerTurn(true);
        setTimeLeftX(30);
        setTimeLeftO(30);
        setWinner(null);
        setWinningLine([]);
        setMessages([]);
        setPlayerSymbol(null); // Reset player symbol
        setBotSymbol(null); // Reset bot symbol
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
                } w-full h-full`}
                onClick={() => handleClick(index)}
            >
                {symbol && (
                    <img
                        src={symbolImage}
                        alt={`${symbol} symbol`}
                        className="w-[60px] h-[60px]"
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

    // Function to determine the bot's move
    const botMove = () => {
        const findWinningMove = (symbol) => {
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

            for (let line of lines) {
                const [a, b, c] = line;
                if (board[a] === symbol && board[b] === symbol && !board[c]) return c;
                if (board[a] === symbol && board[c] === symbol && !board[b]) return b;
                if (board[b] === symbol && board[c] === symbol && !board[a]) return a;
            }

            return null;
        };

        // Check if bot can win
        const winningMove = findWinningMove(botSymbol);
        if (winningMove !== null) {
            makeBotMove(winningMove);
            return;
        }

        // Check if bot needs to block player
        const blockingMove = findWinningMove(playerSymbol);
        if (blockingMove !== null) {
            makeBotMove(blockingMove);
            return;
        }

        // If no winning or blocking move, choose random
        const availableMoves = board.map((val, index) => (val === null ? index : null)).filter((val) => val !== null);
        const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        makeBotMove(randomMove);
    };

    const makeBotMove = (index) => {
        const newBoard = [...board];
        newBoard[index] = botSymbol; // Bot's symbol
        setBoard(newBoard);
        setIsXNext(true);
        setIsPlayerTurn(true); // Switch to player's turn
    };

    const chooseSymbol = (symbol) => {
        setPlayerSymbol(symbol);
        setBotSymbol(symbol === 'x' ? 'o' : 'x');
    };

    return (
        <div className="min-h-auto w-auto bg-primary flex items-center justify-center p-4">
            <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 w-full max-w-6xl">
                {/* User chooses X or O */}
                {!playerSymbol && (
                    <div className="flex justify-center items-center flex-col space-y-4">
                        <h2 className="text-white text-2xl">Choose Your Symbol</h2>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => chooseSymbol('x')}
                                className="px-4 py-2 bg-secondary text-white rounded-md shadow-md hover:bg-secondaryLight"
                            >
                                X
                            </button>
                            <button
                                onClick={() => chooseSymbol('o')}
                                className="px-4 py-2 bg-secondary text-white rounded-md shadow-md hover:bg-secondaryLight"
                            >
                                O
                            </button>
                        </div>
                    </div>
                )}
                {/* Board with Player Info */}
                {playerSymbol && (
                    // <div className="relative bg-primaryLight bg-opacity-40 backdrop-blur-lg p-8 rounded-lg shadow-lg flex-1 flex flex-col items-center justify-center">
                    <div className="bg-primaryLight bg-opacity-40 backdrop-blur-lg p-8 rounded-lg shadow-lg w-[380px] h-[380px]">
    <div className="grid grid-cols-3 grid-rows-3 gap-2 w-full h-full border border-white">
        {Array(9).fill(null).map((_, index) => renderSquare(index))}
    </div>
    {winner && (
        <div className="mt-4 text-center">
            {winner === 'Draw' ? (
                <p className="text-white text-lg">It's a draw!</p>
            ) : (
                <p className="text-white text-lg">{winner} wins!</p>
            )}
            <button
                onClick={handlePlayAgain}
                className="mt-2 px-4 py-2 bg-secondary text-white rounded-md shadow-md hover:bg-secondaryLight"
            >
                Play Again
            </button>
        </div>
    )}
</div>

                )}
                {/* Chat Box */}
                <div className="flex-1 bg-primaryLight bg-opacity-40 backdrop-blur-lg p-4 rounded-lg shadow-lg flex flex-col">
                    <div className="flex-grow overflow-y-auto">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${
                                    message.fromMe ? 'justify-end' : 'justify-start'
                                }`}
                            >
                                <div
                                    className={`p-2 m-1 max-w-xs rounded ${
                                        message.fromMe
                                            ? 'bg-secondary text-white'
                                            : 'bg-white text-black'
                                    }`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center mt-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 p-2 rounded border"
                        />
                        <button
                            onClick={handleSubmitMessage}
                            className="ml-2 px-4 py-2 bg-secondary text-white rounded shadow-md hover:bg-secondaryLight"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>

            {/* Confirmation Popup */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <p className="mb-4">Are you sure you want to leave?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleCancelLeave}
                                className="px-4 py-2 bg-gray-300 rounded-md shadow-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmLeave}
                                className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md"
                            >
                                Leave
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RobotBoard;
