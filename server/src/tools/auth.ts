import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config'

const secretKey = process.env['JWT_SECRET'];

async function hashPassword(password: string | Buffer): Promise<string> {
    // This function hashes a password and returns it
    const salt = await bcrypt.genSalt();
    return (bcrypt.hash(password, salt));
}

async function checkPassword(password: string | Buffer, hashed_password: string): Promise<boolean> {
    // This function compaires a hashed password with a string password
    // Returns: true if the passwords matches,other way it returns false
    return (bcrypt.compare(password, hashed_password))
}

function generateToken(payload: object): string {
    // This function generates and returns a JWT token using payload
    if (!secretKey)
        throw new Error('JWT SECRET is doesn\'t exist');
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

function verifyToken(token: string): JwtPayload {
    // This function varifies the JWT token
    if (!secretKey)
        throw new Error('JWT SECRET is doesn\'t exist');
    try {
        return jwt.verify(token, secretKey) as JwtPayload;
    } catch (error) {
        throw new Error('Invalid token');
    }
}


export {hashPassword, checkPassword, generateToken, verifyToken};
