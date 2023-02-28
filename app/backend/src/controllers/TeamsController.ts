import { Request, Response } from 'express';
import { IServiceTeam } from '../interfaces/IServiceTeam';

export default class TeamsController {
  private _service: IServiceTeam;
  constructor(service: IServiceTeam) {
    this._service = service;
  }

  async getAll(req: Request, res: Response) {
    const teams = await this._service.getAll();
    return res.status(200).json(teams);
  }
}
