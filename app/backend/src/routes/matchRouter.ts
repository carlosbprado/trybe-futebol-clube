import { Router, Request, Response } from 'express';
import MatchController from '../controllers/MatchController';
import MatchService from '../services/MatchService';

const service = new MatchService();
const matchController = new MatchController(service);

const matchRoutes = Router();

matchRoutes.get('/matches', (req: Request, res: Response) => matchController.get(req, res));

export default matchRoutes;
