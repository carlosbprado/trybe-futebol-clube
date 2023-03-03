import * as jwt from 'jsonwebtoken';

const tokenSecret = process.env.JWT_SECRET || '';

const generateToken = (email: string, role:string) =>
  jwt.sign({ email, role }, tokenSecret, { expiresIn: '15d' });

async function authToken(token: string): Promise<string | jwt.JwtPayload | null> {
  try {
    const decrypted = jwt.verify(token, tokenSecret);
    return decrypted;
  } catch (error) {
    return null;
  }
}

export { generateToken, authToken };
