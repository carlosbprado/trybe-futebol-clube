import { ModelStatic } from 'sequelize';
import Team from '../database/models/TeamsModel';
import { IServiceTeam } from '../interfaces/IServiceTeam';

export default class TeamsService implements IServiceTeam {
  protected model: ModelStatic<Team> = Team;

  async getAll(): Promise<Team[]> {
    const teams = await this.model.findAll();
    return teams;
  }
}
