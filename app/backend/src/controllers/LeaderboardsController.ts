import { Request, Response } from 'express';
import IServiceBoards from '../interfaces/IServiceBoards';

export default class LeaderboardsController {
  private _service: IServiceBoards;
  constructor(service: IServiceBoards) {
    this._service = service;
  }

  async find(req: Request, res: Response) {
    const boards = await this._service.find();
    return res.status(200).json(boards);
  }
}
