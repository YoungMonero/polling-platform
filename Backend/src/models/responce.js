import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

class Response extends Model {}

Response.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pollId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  participantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Response',
});

export default Response;