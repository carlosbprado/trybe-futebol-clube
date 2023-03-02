import { Request, Response } from 'express';
import IServiceUser from '../interfaces/IServiceUser';

export default class UserController {
  private _service: IServiceUser;
  constructor(service: IServiceUser) {
    this._service = service;
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this._service.login(email, password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    return res.status(200).json(user);
  }

  static async get(req: Request, res: Response) {
    const { role } = req.body.user;
    if (!role) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    return res.status(200).json({ role });
  }
}
