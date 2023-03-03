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

  async matchInProgress(req: Request, res: Response) {
    const matches = await this._service.matchInProgress();
    return res.status(200).json(matches);
  }

  async matchOutProgress(req: Request, res: Response) {
    const matches = await this._service.matchOutProgress();
    return res.status(200).json(matches);
  }

  async finished(req: Request, res: Response) {
    const { id } = req.params;
    const matchesFinish = await this._service.finished(Number(id));
    console.log(matchesFinish);
    return res.status(200).json(matchesFinish);
  }
}
