import { Router } from "express";
import { signin, signup, me } from "../controllers/AuthController";

const users = Router();

users.get('/@me', me);

users.get('/status', (req, res) => {return res.status(200).send({'status': 'OK'})})

users.post('/signin', signin);

users.post('/signup', signup);

// users.post('/signout')

export default users;