import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import { generateToken } from '../jwt/token';
import User from '../database/models/UserModel';
import IServiceUser, { TLogin, Tmessage } from '../interfaces/IServiceUser';

export default class UserService implements IServiceUser {
  protected model: ModelStatic<User> = User;

  async login(email: string, password: string): Promise<User | TLogin | null | Tmessage> {
    const user = await this.model.findOne({ where: { email } });
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!regex.test(email)) {
      return null;
    }
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return null;
      }
      const token = generateToken(email, user.role);
      return { token };
    }
    return null;
  }
}
