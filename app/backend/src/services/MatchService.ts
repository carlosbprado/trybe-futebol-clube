import { ModelStatic } from 'sequelize';
import Team from '../database/models/TeamsModel';
import IServiceMatch from '../interfaces/IServiceMatch';
import Match from '../database/models/MatchesModel';

export default class MatchService implements IServiceMatch {
  protected model: ModelStatic<Match> = Match;

  async get(): Promise<Match[]> {
    const matches = await this.model.findAll({
      include: [{
        model: Team, as: 'homeTeam', attributes: { exclude: ['id'] },
      }, {
        model: Team, as: 'awayTeam', attributes: { exclude: ['id'] },
      },
      ],
    });
    return matches;
  }
}
