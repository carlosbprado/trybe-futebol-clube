import User from '../database/models/UserModel';

export type TLogin = {
  token: string
};

export default interface IServiceUser {
  login(email:string, password:string): Promise<User | TLogin>
}
