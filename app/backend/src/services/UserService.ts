import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import generateToken from '../jwt/token';
import User from '../database/models/UserModel';
import IServiceUser, { TLogin } from '../interfaces/IServiceUser';

export default class UserService implements IServiceUser {
  protected model: ModelStatic<User> = User;

  async login(email: string, password: string): Promise<User | TLogin> {
    const user = await this.model.findOne({ where: { email } });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = generateToken(email);
        return { token };
      }
    }
    return user as User;
  }
}
