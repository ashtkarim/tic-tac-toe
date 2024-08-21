import { Router } from "express";
import User from "../Models/User";
import { json } from "body-parser";
import session from "express-session";

declare module 'express-session' {
  interface SessionData {
    session_id?: string;
  }
}


const users = Router();

users.get('/@me', (req, res) => {
  console.log(req.session);
    // return the session_id
    res.status(200).send(JSON.stringify({"id": req.session.session_id}));
});

users.post('/login', async (req, res) => {
  const { username, password } = req.body
  console.log(username, password)
  const user = await User.findOne({ username: username });
  if (user && user.password === password) {
    console.log("logged");
    req.session.session_id = '45er';
    // console.log(req.session)
    res.status(200).send(JSON.stringify({"msg": "logged in"}))
  }
});

users.post('/register', (req, res) => {
  const { username, password } = req.body
  console.log(username, password)
  const user = new User({username, password})
  user.save();
  res.status(201).send("user created");
});

export default users;