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

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;
    const updateMatches = await this._service.update(Number(id), body);
    return res.status(200).json(updateMatches);
  }

  async create(req: Request, res: Response) {
    const { body } = req;
    const { status, message } = await this._service.create(body);
    if (typeof message === 'string') {
      return res.status(status).json({ message });
    }
    return res.status(status).json(message);
  }
}
