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
  if (req.session.session_id) {
    const user = {
      username: 'radouane',
      email: 'red@gmail.com'
    }
    res.status(200).send(JSON.stringify({"user": user}));
    // res.status(200).send(JSON.stringify({"id": req.session.session_id}));
  }
  else
    res.status(403).send(JSON.stringify({"error": "FORBIDEN"}))
});

users.post('/login', async (req, res) => {
  const { email, password } = req.body
  console.log(email, password)
  const user = await User.findOne({ email: email });
  if (user && user.password === password) {
    // console.log("logged");
    req.session.session_id = '45er';
    res.status(200).send(JSON.stringify({"msg": "logged in"}))
  } else {
    res.status(401).send(JSON.stringify({'error': 'UNAUTHORIZED'}))
  }
});

users.post('/register', (req, res) => {
  const { username, email, password } = req.body
  console.log(username, email, password)
  const user = new User({username, email, password})
  user.save();
  res.status(201).send("user created");
});

export default users;