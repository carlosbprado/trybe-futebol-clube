import { ModelStatic } from 'sequelize';
import Team from '../database/models/TeamsModel';
import IServiceMatch,
{ TBody, TCreateBody, Tmessage, TmessageFinish } from '../interfaces/IServiceMatch';
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

  async finished(id: number): Promise<TmessageFinish> {
    await this.model.update({ inProgress: false }, {
      where: { id },
    });
    return { message: 'Finished' };
  }

  async update(id: number, body: TBody): Promise<[number]> {
    const updateMatch = await this.model.update({ ...body }, { where: { id } });
    return updateMatch;
  }

  async create(body: TCreateBody): Promise< Tmessage> {
    const awayTeam = await Team.findByPk(body.awayTeamId);
    const homeTeam = await Team.findByPk(body.homeTeamId);
    if (body.awayTeamId === body.homeTeamId) {
      return { status: 422, message: 'It is not possible to create a match with two equal teams' };
    }
    if (!awayTeam || !homeTeam) {
      return { status: 404, message: 'There is no team with such id!' };
    }
    const newMatch = await this.model.create({ ...body });
    return { status: 201, message: newMatch };
  }
}
