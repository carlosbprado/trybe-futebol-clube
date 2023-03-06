import Match from '../database/models/MatchesModel';

export type Tmessage = {
  message: string | Match
  status: number
};

export type TmessageFinish = {
  message: string
};

export type TBody = {
  homeTeamGoals: number;
  awayTeamGoals: number;
};

export type TCreateBody = {
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
};

export default interface IServiceMatch {
  get(): Promise<Match[]>
  matchInProgress(): Promise<Match[]>
  matchOutProgress(): Promise<Match[]>
  finished(id: number):Promise<TmessageFinish>
  update(id: number, body: TBody): Promise<[number]>
  create(body: TCreateBody): Promise< Tmessage>
}
