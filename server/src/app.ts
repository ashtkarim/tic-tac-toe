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
const { v4: getId } = require('uuid');

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
      currentRoom = getId();
      allGames[currentRoom] = [];
  }
  if (allGames[currentRoom].length === 1 && !io.sockets.sockets.get(allGames[currentRoom][0])) {
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
  
  allGames[currentRoom].push(socketId);
  socket.join(currentRoom);
  io.in(currentRoom).emit('create_room', {'roomId': currentRoom});

  if (currentRoom && allGames[currentRoom].length === 2) {
    console.log(`${allGames[currentRoom][0]} VS ${allGames[currentRoom][1]}`);
    io.to(allGames[currentRoom][0]).emit('playerId', {playerId: '1', turn: true})
    io.to(allGames[currentRoom][1]).emit('playerId', {playerId: '2', turn: false})
    io.in(currentRoom).emit('start_game', true);
    io.to(allGames[currentRoom][0]).emit('turn', {turn: true});
  }

  socket.on('send_message', (data) => {
    // console.log('message ==>', data);
    socket.to(data.roomId).emit('receive_message', {msg: data.msg});
  });

  socket.on('player_move', (data) => {
    // console.log(data);
    const board = data.board;
    if (board[data.index] === null) {
      board[data.index] = icons[data.playerId];
      // console.log(board);
      io.in(data.roomId).emit('update_board', {
        board
      });
      if (checkWinner(board, icons[data.playerId])) {
        io.to(allGames[data.roomId][0]).emit('end_game', {winner: data.playerId === '1'})
        io.to(allGames[data.roomId][1]).emit('end_game', {winner: data.playerId === '2'})
      } else if (!board.includes(null)) {
        io.to(allGames[data.roomId][0]).emit('end_game', {draw: true})
        io.to(allGames[data.roomId][1]).emit('end_game', {draw: true})
      } else {
        io.to(allGames[data.roomId][0]).emit('update_turn', {turn: data.playerId === '2'})
        io.to(allGames[data.roomId][1]).emit('update_turn', {turn: data.playerId === '1'})
      }
    }
    // io.to(data.roomId).emit('update_game', {board: });
  })

  socket.on('time_out', ({playerId, roomId}) => {
    console.log('time out info:', {playerId, roomId})
    io.to(allGames[roomId][0]).emit('end_game', {winner: playerId === '2'})
    io.to(allGames[roomId][1]).emit('end_game', {winner: playerId === '1'})
  })

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
