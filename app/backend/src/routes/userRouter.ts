import { Router, Request, Response } from 'express';
import validateLogin from '../middlewares/login';
import UserService from '../services/UserService';

import UserController from '../controllers/UserController';

const service = new UserService();
const userController = new UserController(service);

const userRoutes = Router();

userRoutes.post('/login', validateLogin, (req: Request, res: Response) =>
  userController.login(req, res));

export default userRoutes;
