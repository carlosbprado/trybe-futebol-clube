import { NextFunction, Request, Response } from 'express';
import { authToken } from '../jwt/token';

async function validateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const user = await authToken(token);
  if (!user) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  req.body.user = user;
  next();
}

export default validateToken;
