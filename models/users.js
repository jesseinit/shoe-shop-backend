import sequelize from 'sequelize';
const { Model, Sequelize } = sequelize;
import DbConn from './index.js';
import { v4 as UUIDV4 } from 'uuid';

class Users extends Model {
  static associate(models) {
    // define association here
  }
}

Users.init(
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => UUIDV4(),
    },
    accountType: Sequelize.DataTypes.STRING,
    email: Sequelize.DataTypes.STRING,
    firstName: Sequelize.DataTypes.STRING,
    lastName: Sequelize.DataTypes.STRING,
  },
  {
    sequelize: DbConn.sequelize,
    freezeTableName: true,
  }
);

export default Users;

// return User;
