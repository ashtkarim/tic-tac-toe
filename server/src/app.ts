import express, { Request, Response } from "express";
import cors from 'cors';
import mongoose from "./engine/db";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import users from "./routes/users";
import 'dotenv/config'
import { Server } from "socket.io";
import http from 'http';
import { all } from "axios";
import { Socket } from "dgram";
import { disconnect } from "process";
const { v4: getId } = require('uuid');
import User from './Models/User';

const WINNING_POS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


const port = parseInt(process.env.SERVER_PORT || '3000', 10);
const host = process.env.SERVER_HOST ||  '127.0.0.1';

const app = express();
app.use(express.json());
app.use(cookieParser());


// Cors config to allow cross origin requests
app.use(cors({
  origin: 'http://127.0.0.1:5000',
  credentials: true,
}));

app.use(users);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
      origin: 'http://127.0.0.1:5000',
  }
});

// SOCKET LOGIC

const allGames = {};
let currentRoom = getId();
allGames[currentRoom] = [];
const icons = {'1': 'x', '2': 'o'}


function handleMultiRooms(socket) {
  if (currentRoom === null || allGames[currentRoom] && allGames[currentRoom].length === 2) {
    console.log(`room is full`);
      currentRoom = getId();
      allGames[currentRoom] = [];
  }
  if (allGames[currentRoom].length === 1 && !io.sockets.sockets.get(allGames[currentRoom][0])) {
    console.log(`connection lost ${socket.id}`);
        currentRoom = getId();
        allGames[currentRoom] = [];
  }
}

function checkWinner(board, icon) {

  for (let i = 0; i < WINNING_POS.length; i++) {
      const [a, b, c] = WINNING_POS[i];
      if (board[a] === icon && board[a] === board[b] && board[a] === board[c]) {
          return (true);
      }
  }
};

function startSocket(socket) {
  const socketId = socket.id;

  handleMultiRooms(socket);
  
  // adds the players to the room
  allGames[currentRoom].push(socketId);
  socket.join(currentRoom);
  io.in(currentRoom).emit('create_room', {'roomId': currentRoom});

  // start the game by sending the players their id's
  if (currentRoom && allGames[currentRoom].length === 2) {
    console.log('game started')
    console.log(`${allGames[currentRoom][0]} VS ${allGames[currentRoom][1]}`);  
    io.to(allGames[currentRoom][0]).emit('playerId', {playerId: '1', turn: true})
    io.to(allGames[currentRoom][1]).emit('playerId', {playerId: '2', turn: false})
    io.in(currentRoom).emit('start_game', true);
    // the player n1 will start first
    io.to(allGames[currentRoom][0]).emit('turn', {turn: true});
  }

  // takes a msg from a user and send it to the other one
  socket.on('send_message', (data) => {
    // console.log('message ==>', data);
    socket.to(data.roomId).emit('receive_message', {msg: data.msg});
  });

  // the logic of the game play
  socket.on('player_move', async (data) => {
    const board = data.board;
    const playerId = data.playerId;
    const roomId = data.roomId;
    // console.log(data);

    if (board[data.index] === null) {
      board[data.index] = icons[playerId];

      io.in(roomId).emit('update_board', { board });

      const player1Id = allGames[roomId][0];
      const player2Id = allGames[roomId][1];

      if (checkWinner(board, icons[playerId])) {
        // Update winner and loser statistics
        const winnerId = playerId === '1' ? player1Id : player2Id;
        const loserId = playerId === '1' ? player2Id : player1Id;

        // Increase score by 10 for a win
        await User.findByIdAndUpdate(winnerId, { $inc: { wins: 1, score: 10 } });
        // Decrease score by 5 for a loss
        await User.findByIdAndUpdate(loserId, { $inc: { losses: 1, score: -5 } });

        io.to(player1Id).emit('end_game', { winner: playerId === '1' });
        io.to(player2Id).emit('end_game', { winner: playerId === '2' });

      } else if (!board.includes(null)) {
        // Update draw statistics
        // Increase score by 2 for a draw
        await User.findByIdAndUpdate(player1Id, { $inc: { draws: 1, score: 2 } });
        await User.findByIdAndUpdate(player2Id, { $inc: { draws: 1, score: 2 } });

        io.to(player1Id).emit('end_game', { draw: true });
        io.to(player2Id).emit('end_game', { draw: true });

      } else {
        io.to(player1Id).emit('update_turn', { turn: playerId === '2' });
        io.to(player2Id).emit('update_turn', { turn: playerId === '1' });
      }
    }
  });

  socket.on('disconnect', () => {
    console.log(`player disconnected ${socketId}`)
    for (let [roomId, players] of Object.entries(allGames)) {
      const playerArray = players as string[];
      if (playerArray.includes(socketId)) {
        io.in(roomId).emit('disconnected', 'exited');
      }
    }
  })

  // when one player exits the game the room will be deleted
  socket.on('exit_msg', ({roomId}) => {
    console.log('player exited', roomId)
    socket.to(roomId).emit('disconnected', `player with id ${socketId} have disconected`);
    delete allGames[roomId];
    currentRoom = null;
})
}

io.on('connection', startSocket)

// once the database starts the server will start
mongoose.connection.once('open', () => {
  server.listen(port, host, () => { 
    console.log(`Server is runing <${host}:${port}>`);
  });
})
