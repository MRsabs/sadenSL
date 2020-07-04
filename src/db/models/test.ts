import { Model, DataTypes } from 'sequelize';
import sequelize from '../init';
import { uuidV4 } from '../../util/native';

export class Team extends Model {}
Team.init(
  {
    id: {
      type: DataTypes.STRING,
      defaultValue() {
        return uuidV4();
      },
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
    },
  },
  { sequelize, modelName: 'team' }
);

export class Player extends Model {}
Player.init(
  {
    id: {
      type: DataTypes.STRING,
      defaultValue() {
        return uuidV4();
      },
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
    },
  },
  { sequelize, modelName: 'player' }
);
