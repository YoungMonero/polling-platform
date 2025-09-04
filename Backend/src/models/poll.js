import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

class Poll extends Model {}

Poll.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  options: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('draft', 'published', 'closed'),
    defaultValue: 'draft',
  },
  sessionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Poll',
});

export default Poll;