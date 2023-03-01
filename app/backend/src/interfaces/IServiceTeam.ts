import Team from '../database/models/TeamsModel';

export interface IServiceTeam {
  findAll(): Promise<Team[]>
  findOne(id: number): Promise<Team | null>
}
