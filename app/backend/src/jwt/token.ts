import * as jwt from 'jsonwebtoken';
import { Tmessage } from '../interfaces/IServiceUser';

const tokenSecret = process.env.JWT_SECRET || 'outrasenha';

const generateToken = (email: string, role:string) =>
  jwt.sign({ email, role }, tokenSecret, { expiresIn: '15d' });

async function authToken(token: string | undefined): Promise<string | jwt.JwtPayload | Tmessage> {
  if (!token) {
    return { message: 'Token not found' };
  }
  try {
    const decrypted = await jwt.verify(token, tokenSecret);
    return decrypted;
  } catch (error) {
    return { message: 'Token must be a valid token' };
  }
}

export { generateToken, authToken };
