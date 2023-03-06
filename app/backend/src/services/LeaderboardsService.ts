import { ModelStatic } from 'sequelize';
import Match from '../database/models/MatchesModel';
import Team from '../database/models/TeamsModel';
import IServiceBoards, { TBoards } from '../interfaces/IServiceBoards';

export default class LeaderboardsService implements IServiceBoards {
  protected teamModel: ModelStatic<Team> = Team;
  protected matchModel: ModelStatic<Match> = Match;

  private static calcVictories(matchByTeam: Match[]): number {
    return matchByTeam.reduce((acc, curr: Match) => {
      let count: number = acc;
      count += curr.homeTeamGoals > curr.awayTeamGoals ? 1 : 0;
      return count;
    }, 0);
  }

  private static calcDraws(matchByTeam: Match[]): number {
    return matchByTeam.reduce((acc, curr: Match) => {
      let count: number = acc;
      count += curr.homeTeamGoals === curr.awayTeamGoals ? 1 : 0;
      return count;
    }, 0);
  }

  private static calcLosses(matchByTeam: Match[]): number {
    return matchByTeam.reduce((acc, curr: Match) => {
      let count: number = acc;
      count += curr.homeTeamGoals < curr.awayTeamGoals ? 1 : 0;
      return count;
    }, 0);
  }

  private static calcGoalsFavor(matchByTeam: Match[]): number {
    return matchByTeam.reduce((acc, curr: Match) => {
      let count: number = acc;
      count += curr.homeTeamGoals;
      return count;
    }, 0);
  }

  private static calcGoalsOwn(matchByTeam: Match[]): number {
    return matchByTeam.reduce((acc, curr: Match) => {
      let count: number = acc;
      count += curr.awayTeamGoals;
      return count;
    }, 0);
  }

  private static calcPoints(matchByTeam: Match[]): number {
    const { calcVictories, calcDraws } = LeaderboardsService;
    return (calcVictories(matchByTeam) * 3) + calcDraws(matchByTeam);
  }

  private static calcGoalsBalance(matchByTeam: Match[]): number {
    const { calcGoalsFavor, calcGoalsOwn } = LeaderboardsService;
    return calcGoalsFavor(matchByTeam) - calcGoalsOwn(matchByTeam);
  }

  private static calcEfficiency(matchByTeam: Match[]): string {
    const { calcPoints } = LeaderboardsService;
    const calc = (calcPoints(matchByTeam) / (matchByTeam.length * 3)) * 100;
    return calc.toFixed(2);
  }

  private static createNewTeam(matchByTeam: Match[], teamName: string): TBoards {
    const { calcVictories, calcDraws, calcLosses, calcEfficiency,
      calcGoalsFavor, calcGoalsOwn, calcGoalsBalance, calcPoints } = LeaderboardsService;
    return { name: teamName,
      totalGames: matchByTeam.length,
      totalVictories: calcVictories(matchByTeam),
      totalDraws: calcDraws(matchByTeam),
      totalLosses: calcLosses(matchByTeam),
      totalPoints: calcPoints(matchByTeam),
      goalsFavor: calcGoalsFavor(matchByTeam),
      goalsOwn: calcGoalsOwn(matchByTeam),
      goalsBalance: calcGoalsBalance(matchByTeam),
      efficiency: calcEfficiency(matchByTeam),
    };
  }

  private static orderLeaderBoard(leaderBoard: TBoards[]): TBoards[] {
    return leaderBoard.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
  }

  async find(): Promise<TBoards[]> {
    const { createNewTeam, orderLeaderBoard } = LeaderboardsService;
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll({ where: { inProgress: false } });
    const leaderBoard = teams.map((team) => {
      const matchByTeam = matches.filter((match: Match) => match.homeTeamId === team.id);
      return createNewTeam(matchByTeam, team.teamName);
    });
    return orderLeaderBoard(leaderBoard);
  }
}
