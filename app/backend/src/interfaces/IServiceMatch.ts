import Match from '../database/models/MatchesModel';

export default interface IServiceMatch {
  get(): Promise<Match[]>
}
