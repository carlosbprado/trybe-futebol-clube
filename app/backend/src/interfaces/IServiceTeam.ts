import Team from '../database/models/TeamsModel';

export interface IServiceTeam {
  getAll(): Promise<Team[]>
}
