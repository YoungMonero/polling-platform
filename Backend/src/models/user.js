import {DataTypes, Model} from 'sequelize';
import bcrypt from 'bcryptjs'
import sequelize from '../config/sequelize.js';

class User extends Model {
    async comparePassword(password) {
        return bcrypt.compare(password, this.password);
    }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'host'),
    allowNull: false,
    defaultValue: 'user',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  },
 {
  sequelize,
  modelName: 'User',
  hooks: {
    beforeSave: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    },
  },
});

export default User;