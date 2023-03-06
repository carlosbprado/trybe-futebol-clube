import { Router, Request, Response } from 'express';
import LeaderboardsService from '../services/LeaderboardsService';
import LeaderboardsController from '../controllers/LeaderboardsController';

const service = new LeaderboardsService();
const leaderboardsController = new LeaderboardsController(service);

const leaderboardsRoutes = Router();

leaderboardsRoutes.get('/leaderboard/home', (req: Request, res: Response) =>
  leaderboardsController.find(req, res));

export default leaderboardsRoutes;
