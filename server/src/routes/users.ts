import { Router } from "express";
import { signin, signup, me, getTopUsers } from "../controllers/AuthController";

const users = Router();

users.get('/@me', me);

users.get('/status', (req, res) => {return res.status(200).send({'status': 'OK'})})

users.post('/signin', signin);

users.post('/signup', signup);

users.get('/top', getTopUsers);

export default users;