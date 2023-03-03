import { DataTypes, Model } from 'sequelize';
import db from '.';
import Team from './TeamsModel';

class Match extends Model {
  declare id: number;
  declare teamName: string;
}

Match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  homeTeamId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  timestamps: false,
  underscored: true,
  modelName: 'matches',
});

Match.belongsTo(Team, { foreignKey: 'home_team_id', as: 'homeTeamId' });
Team.hasMany(Match, { foreignKey: 'home_team_id', as: 'matchTeamId' });

Match.belongsTo(Team, { foreignKey: 'away_team_id', as: 'awayTeamId' });
Team.hasMany(Match, { foreignKey: 'away_team_id', as: 'matchAwayId' });
export default Match;
