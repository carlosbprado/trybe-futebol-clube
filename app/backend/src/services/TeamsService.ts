import { ModelStatic } from 'sequelize';
import Team from '../database/models/TeamsModel';
import { IServiceTeam } from '../interfaces/IServiceTeam';

export default class TeamsService implements IServiceTeam {
  protected model: ModelStatic<Team> = Team;

  async findAll(): Promise<Team[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async findOne(id: number): Promise<Team | null> {
    const team = await this.model.findByPk(id);
    return team;
  }
}
