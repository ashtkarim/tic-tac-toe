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
const { v4: getId } = require('uuid');


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


function handleMultiRooms() {
  if (currentRoom === null || allGames[currentRoom] && allGames[currentRoom].length === 2) {
    io.in(currentRoom).emit('start_game', true);
    currentRoom = getId();
    allGames[currentRoom] = [];
}}

function startSocket(socket) {
  const socketId = socket.id;

  handleMultiRooms();

  allGames[currentRoom].push(socketId);
  socket.join(currentRoom);
  io.in(currentRoom).emit('create_room', {'roomId': currentRoom});

  socket.on('send_message', (data) => {
    // console.log('message ==>', data);
    socket.to(data.roomId).emit('receive_message', {msg: data.msg});
  });

  socket.on('exit_msg', ({roomId}) => {
    // console.log('data:', data);
    socket.to(roomId).emit('disconected', `player with id ${socketId} have disconected`);
    delete allGames[roomId];
    currentRoom = null;
    // console.log(allGames);
})
console.log(allGames)
}

io.on('connection', startSocket)

// once the database starts the server will start
mongoose.connection.once('open', () => {
  server.listen(port, host, () => { 
    console.log(`Server is runing <${host}:${port}>`);
  });
})
