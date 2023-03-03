import Match from '../database/models/MatchesModel';

export type Tmessage = {
  message: string
};

export default interface IServiceMatch {
  get(): Promise<Match[]>
  matchInProgress(): Promise<Match[]>
  matchOutProgress(): Promise<Match[]>
  finished(id: number):Promise<Tmessage>
}
