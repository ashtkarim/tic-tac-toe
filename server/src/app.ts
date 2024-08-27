import express, { Request, Response } from "express";
import cors from 'cors';
import mongoose from "./engine/db";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import users from "./routes/users";
import 'dotenv/config'

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

// once the database starts the server will start
mongoose.connection.once('open', () => {
  app.listen(port, host, () => { 
    console.log(`Server is runing <${host}:${port}>`);
  });
})
