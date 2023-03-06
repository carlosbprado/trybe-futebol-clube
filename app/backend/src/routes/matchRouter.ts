import { Router, Request, Response } from 'express';
import validateToken from '../middlewares/validateToken';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';

const service = new MatchService();
const matchController = new MatchController(service);

const matchRoutes = Router();

matchRoutes.get('/matches', (req: Request, res: Response) => {
  if (req.query.inProgress === 'true') {
    return matchController.matchInProgress(req, res);
  }
  if (req.query.inProgress === 'false') {
    return matchController.matchOutProgress(req, res);
  }
  return matchController.get(req, res);
});

matchRoutes.patch('/matches/:id/finish', validateToken, (req: Request, res: Response) =>
  matchController.finished(req, res));

matchRoutes.patch('/matches/:id', validateToken, (req: Request, res: Response) =>
  matchController.update(req, res));

matchRoutes.post('/matches', validateToken, (req: Request, res: Response) =>
  matchController.create(req, res));

export default matchRoutes;
