import { Router, Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

import TeamsController from '../controllers/TeamsController';

const service = new TeamsService();
const teamsController = new TeamsController(service);

const teamsRoutes = Router();

teamsRoutes.get('/teams', (req: Request, res: Response) => teamsController.findAll(req, res));
teamsRoutes.get('/teams/:id', (req: Request, res: Response) => teamsController.findOne(req, res));

export default teamsRoutes;
