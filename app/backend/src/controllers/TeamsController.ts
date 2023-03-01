import { Request, Response } from 'express';
import { IServiceTeam } from '../interfaces/IServiceTeam';

export default class TeamsController {
  private _service: IServiceTeam;
  constructor(service: IServiceTeam) {
    this._service = service;
  }

  async findAll(req: Request, res: Response) {
    const teams = await this._service.findAll();
    return res.status(200).json(teams);
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this._service.findOne(Number(id));
    return res.status(200).json(team);
  }
}
