import { Request, Response } from 'express';
import IServiceMatch from '../interfaces/IServiceMatch';

export default class MatchController {
  private _service: IServiceMatch;
  constructor(service: IServiceMatch) {
    this._service = service;
  }

  async get(req: Request, res: Response) {
    const matches = await this._service.get();
    return res.status(200).json(matches);
  }
}
