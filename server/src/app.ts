import express, { Request, Response } from "express";
import cors from 'cors';
import mongoose from "./engine/db";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import users from "./routes/users";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: '123456',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000 // 1 hour
  }
}));

app.use(cors({
  origin: 'http://127.0.0.1:5000',
  credentials: true,
}));

app.use(users);

mongoose.connection.once('open', () => {
  app.listen(3000, "127.0.0.1", () => { 
    console.log("Server is runing ");
  });
})
