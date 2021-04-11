import sequelize from 'sequelize';
const {
  Model,
  Sequelize: { DataTypes },
} = sequelize;
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
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => UUIDV4(),
    },
    state: {
      type: DataTypes.ENUM,
      values: ['ACTIVE', 'ARCHIVED', 'PENDING'],
    },
    account_type: {
      type: DataTypes.ENUM,
      values: ['CUSTOMER', 'SELLER'],
    },
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    first_name: DataTypes.STRING(50),
    last_name: DataTypes.STRING(50),
  },
  {
    sequelize: DbConn.sequelize,
    freezeTableName: true,
  }
);

export default Users;

// return User;
