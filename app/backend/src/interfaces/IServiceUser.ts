import User from '../database/models/UserModel';

export type TLogin = {
  token: string
};

export type Tmessage = {
  message: string
};

export default interface IServiceUser {
  login(email:string, password:string): Promise<User | TLogin | Tmessage | null>
}
