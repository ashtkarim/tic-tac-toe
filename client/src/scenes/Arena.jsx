import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import xSymbol from '../images/x-symbol.svg';
import oSymbol from '../images/o-symbol.svg';
import { io } from 'socket.io-client';
import RotatingMsg from '../components/RotatingMsg.jsx';
import { useAuth } from '../components/AuthProvider.jsx';
const socket = io('http://127.0.0.1:3000');

function Arena({setTitle}) {
  useEffect(() => {
    setTitle("Who you will beat today!!!");
  }, [setTitle]);

  const { user, setUser } = useAuth();
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [winner, setWinner] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // For confirmation popup
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState('');
  const [myTurn, setMyTurn] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [isDrow, setIsDraw] = useState(false);
  const [socket, setSocket] = useState(null); // Add a state for socket

  useEffect(() => {
    setTitle("Who you will beat today!!!");
  }, [setTitle]);

  // Handle socket-related actions within this effect
  useEffect(() => {
    const newSocket = io('http://127.0.0.1:3000');
    setSocket(newSocket);

    // Handle the receive message from the other user
    newSocket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, { text: data.msg, fromMe: false }]);
    });

    // Set the room id when the room is created
    newSocket.on('create_room', (data) => {
      setRoomId(data.roomId);
    });

    // Clear the room if one player exits
    newSocket.on('disconnected', () => {
      alert('other player exited');
      navigate('/');
    });

    // Sets the turn of each user so that each player plays one time
    newSocket.on('turn', (data) => {
      setMyTurn(data.turn);
    });

    // Sets the players' ids when the room has 2 players in it
    newSocket.on('playerId', (data) => {
      setPlayerId(data.playerId);
      setMyTurn(data.turn);
    });

    // Updates the board after each round played
    newSocket.on('update_board', (data) => {
      setBoard(data.board);
    });

    // Switch turns after each round
    newSocket.on('update_turn', ({ turn }) => {
      setMyTurn(turn);
    });

    // Check when the board is full (game ended)
    newSocket.on('end_game', ({ winner, draw }) => {
      if (draw) {
        setIsDraw(true);
      } else {
        setWinner(winner);
      }
    });

    // Cleanup the socket connection when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, [navigate]);

  // When a player clicks on a square (round played)
  const handleClick = (index) => {
    if (board[index] || winner) return;
    if (!myTurn) {
      alert('not your turn!!!');
      return;
    }
    socket.emit('player_move', {
      index: index,
      roomId: roomId,
      board: board,
      playerId: playerId,
    });
  };

  // send a message to the other user
  function handleSubmitMessage(event) {
    event.preventDefault();
    if (newMessage.trim() === '') return;
    setMessages((prev) => [...prev, { text: newMessage, fromMe: true }]);
    socket.emit('send_message', { msg: newMessage, roomId: roomId });
    setNewMessage('');
  }

  // clear the board for a new game
  const handlePlayAgain = () => {
    setBoard(initialBoard);
    setWinner(null);
    setIsDraw(false);
  };

  // check if user want to exit
  const handleLeave = () => {
    setShowPopup(true);
  };

  // navigate to '/'
  const handleConfirmLeave = () => {
    navigate('/');
  };

  // cancel leave
  const handleCancelLeave = () => {
    setShowPopup(false);
  };

  // render of the square
  const renderSquare = (index) => {
    const symbol = board[index];
    const symbolImage = symbol === 'x' ? xSymbol : oSymbol;

    return (
      <div
        key={index}
        className={`flex items-center justify-center border w-full h-full cursor-pointer`}
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

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        handleSubmitMessage(event);
      }
    },
    [newMessage, myTurn]
  );

  return (
    <div className="min-h-screen w-full bg-primary flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 w-full max-w-6xl">
        <div className="relative bg-primaryLight bg-opacity-40 backdrop-blur-lg p-8 rounded-lg shadow-lg flex-1 flex flex-col items-center justify-center">
          {playerId ? (
            <div className="relative grid grid-cols-3 grid-rows-3 gap-2 w-[400px] h-[400px] border border-primaryLight bg-primaryLighter bg-opacity-20 backdrop-blur-md">
              {Array(9)
                .fill(null)
                .map((_, index) => renderSquare(index))}
            </div>
          ) : (
            <RotatingMsg />
          )}
          {(winner !== null || isDrow) && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl font-bold">
              {isDrow ? 'DRAW' : winner ? 'You are a winner' : 'Looooooser'}
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

        <div className="flex flex-col bg-primaryLight bg-opacity-40 backdrop-blur-lg p-6 rounded-lg shadow-lg w-full md:w-96 h-96">
          <div className="text-white font-bold mb-4">Chat Board</div>
          <div className="flex-1 overflow-y-auto mb-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.fromMe ? 'justify-end' : 'justify-start'
                } mb-2`}
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
              type="submit"
              onClick={handleSubmitMessage}
              className="px-4 py-2 bg-secondary text-white rounded-lg ml-2"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Leave</h2>
            <p className="mb-4">Are you sure you want to leave the game?</p>
            <div className="flex justify-end">
              <button
                onClick={handleCancelLeave}
                className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLeave}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Arena;
