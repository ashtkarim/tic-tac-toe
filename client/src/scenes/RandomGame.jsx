import RobotBoard from '../components/RobotBot.jsx';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'; // Ensure you have Tailwind directives in this file or import Tailwind CSS directly
import xSymbol from '../images/x-symbol.svg';
import oSymbol from '../images/o-symbol.svg';
import xIcon from '../images/cat_avatar.png';
import oIcon from '../images/cat_avatar.png';
import { io } from 'socket.io-client';
import { PiNumberNineFill } from 'react-icons/pi';
import RotatingMsg from '../components/RotatingMsg.jsx';
const socket = io('http://127.0.0.1:3000')



function RandomGame() {
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

  const sendMsg = () => {
    setMessages((prev) => [...prev, { text: newMessage, fromMe: true }]);
    socket.emit('send_message', { msg: newMessage, roomId: roomId });
  }

  useEffect(() => {
    // all socket related actions

    // handle the receive message from the other user
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, { text: data.msg, fromMe: false }]);
    });

    // set the room id when the room is created
    socket.on('create_room', (data) => {
      setRoomId(data.roomId);
    });

    // clear the room if one player exits
    socket.on('disconnected', () => {
      alert('other played exited');
      navigate('/');
    });

    // sets the turn of each user
    // so that each player plays one time
    socket.on('turn', (data) => {
      // console.log(data);
      setMyTurn(data.turn);
    })

    // sets the players ids when the room has 2 players in it
    socket.on('playerId', (data) => {
      setPlayerId(data.playerId);
      setMyTurn(data.turn);
    })

    // updates the board after each round played
    socket.on('update_board', (data) => {
      // console.log(data)
      setBoard(data.board);
    })

    // switch turns after each round
    socket.on('update_turn', ({ turn }) => {
      // console.log('current game:', turn);
      setMyTurn(turn);
    })

    // check when the board is full == game ended
    socket.on('end_game', ({ winner, draw }) => {
      if (draw) {
        setIsDraw(true);
      } else {
        setWinner(winner);
      }
    })
  }, [socket]);

  const handleClick = (index) => {
    // when a player clicks o a square (round played)
    if (board[index] || winner) return;
    if (!myTurn) {
      alert('not your turn !!!');
      return;
    }
    // console.log(index);
    socket.emit('player_move',
      {
        index: index,
        roomId: roomId,
        board: board,
        playerId: playerId
      });
  };

  useEffect(() => {
    if (roomId) {
      window.addEventListener('beforeunload', () => {
        socket.emit('exit_msg', { roomId });
      })
    }
  }, [roomId]);

  function handleSubmitMessage(event) {
    event.preventDefault();
    if (newMessage.trim() === '') return;
    sendMsg();
    setNewMessage('');
  };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     if (roundUp) {
  //       if (playerId === '1' && timeLeftX === 0) {
  //         socket.emit('time_out', { playerId, roomId });
  //       } else if (playerId === '2' && timeLeftO === 0) {
  //         socket.emit('time_out', { playerId, roomId });
  //       }
  
  //       if (playerId === '1') {
  //         setTimeLeftX(prev => Math.max(prev - 1, 0));
  //       } else {
  //         setTimeLeftO(prev => Math.max(prev - 1, 0));
  //       }
  //     }
  //   }, 1000);
  
  //   return () => clearInterval(timer);
  // }, [myTurn, timeLeftX, timeLeftO, roundUp]);

  const handlePlayAgain = () => {
    setBoard(initialBoard);
    // setIsXNext(true);
    // setTimeLeftX(30);
    // setTimeLeftO(30);
    setWinner(null);
    setIsDraw(false);
    // setWinningLine([]);
    // setMessages([]);
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
    // const isWinningSquare = winningLine.includes(index);

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
        {/* Board with Player Info */}
        <div className="relative bg-primaryLight bg-opacity-40 backdrop-blur-lg p-8 rounded-lg shadow-lg flex-1 flex flex-col items-center justify-center">
          {/* <div className="flex justify-between items-center mb-4 absolute top-4 left-4 right-4">
            <div className="flex items-center space-x-2">
              <img src={xIcon} alt="Player X" className="w-8 h-8 md:w-10 md:h-10" />
              <span className="text-white font-bold">{timeLeftX}s</span>
            </div>
            <div className="flex items-center space-x-2">
              <img src={oIcon} alt="Player O" className="w-8 h-8 md:w-10 md:h-10" />
              <span className="text-white font-bold">{timeLeftO}s</span>
            </div>
          </div> */}
          {playerId ? 
          <div className="relative grid grid-cols-3 grid-rows-3 gap-2 w-[400px] h-[400px] border border-primaryLight bg-primaryLighter bg-opacity-20 backdrop-blur-md">
          {Array(9).fill(null).map((_, index) => renderSquare(index))}
        </div>
          : <RotatingMsg/>}
          {(winner !== null || isDrow) && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl font-bold">
              {isDrow ? 'DRAW' :
                winner ? 'You are a winner' : 'Looooooser'}
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
                className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'} mb-2`}>
                <div
                  className={`px-4 py-2 rounded-lg ${msg.fromMe
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
              type='submit'
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
}

export default RandomGame;