import * as jwt from 'jsonwebtoken';

const tokenSecret = process.env.JWT_SECRET || 'outrasenha';

const generateToken = (email: string) =>
  jwt.sign({ email }, tokenSecret, { expiresIn: '15d' });

export default generateToken;
