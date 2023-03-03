import { ModelStatic } from 'sequelize';
import Team from '../database/models/TeamsModel';
import IServiceMatch, { Tmessage } from '../interfaces/IServiceMatch';
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

  async matchInProgress(): Promise<Match[]> {
    const matchesInProgress = await this.model.findAll({
      where: { inProgress: true },
      include: [{
        model: Team, as: 'homeTeam', attributes: { exclude: ['id'] },
      }, {
        model: Team, as: 'awayTeam', attributes: { exclude: ['id'] },
      },
      ],
    });
    return matchesInProgress;
  }

  async matchOutProgress(): Promise<Match[]> {
    const matchesInProgress = await this.model.findAll({
      where: { inProgress: false },
      include: [{
        model: Team, as: 'homeTeam', attributes: { exclude: ['id'] },
      }, {
        model: Team, as: 'awayTeam', attributes: { exclude: ['id'] },
      },
      ],
    });
    return matchesInProgress;
  }

  async finished(id: number): Promise<Tmessage> {
    await this.model.update({ inProgress: false }, {
      where: { id },
    });
    return { message: 'Finished' };
  }
}
