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
}
