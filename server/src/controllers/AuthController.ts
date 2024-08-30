import User, { IUser } from "../Models/User";
import { Request, Response } from "express";
import { hashPassword, checkPassword, generateToken, verifyToken } from "../tools/auth";

interface LoginRequestBody {
    username: string;
    email: string;
    password: string;
}


async function me(req: Request<{}, {}, LoginRequestBody>, res: Response) {
    /**
     * This function is the route that protectes all secure routes
     * using Jwt auth
     */
    const token = req.cookies._token;
    const {userId} = verifyToken(token);
    const user = await User.findById(userId);

    return res.status(200).send(JSON.stringify({"user": {
        userName: user?.username,
        id: user?.id
    }}));

}

async function signin(req: Request<{}, {}, LoginRequestBody>, res: Response) {
    /**
     * This function responsible for the signin process
     */
    const {username, password} = req.body;
    const user = await User.findOne({username});

    if (user === null) {
        return res.status(404).send({'status': 'user not found'});
    } else if (! await checkPassword(password, user.password)) {
        return res.status(401).send({"status": "UNATHORIZED"});
    } else {
        const token = generateToken({userId: user.id});
        res.cookie('_token', token);
        return res.status(200).send({'status': 'LOGGED'});
    }
}

async function signup(req: Request<{}, {}, LoginRequestBody>, res: Response) {
    const {username, email, password} = req.body;
    /**
     * This function is responsible for the signup process
     */
    if (!username || !email || !password)
        return res.status(401).send({'status': 'body not complete'})
    const user = await User.findOne({email});

    if (user !== null) {
        return res.status(401).send({'status': 'email already exists'});
    } else {
        const newUser = new User({
            username: username,
            email: email,
            password: await hashPassword(password)
        })
        newUser.save();
        return res.status(201).send({'status': 'user created', 'user': newUser});
    }
}

export { signin, signup, me };
