import sequelize from 'sequelize';
import bycrpt from 'bcrypt';
import DbConn from './index.js';
import { v4 as UUIDV4 } from 'uuid';
import {
  CacheManager,
  NotificatonManager,
  RandomNumberGeneratorManager,
} from '../utils/helpers.js';

const {
  Model,
  Sequelize: { DataTypes },
} = sequelize;

const { HASH_SALT, NODE_ENV } = process.env;

class Users extends Model {}

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
      values: ['ACTIVE', 'DELETED', 'PENDING'],
      defaultValue: 'PENDING',
    },
    accountType: {
      type: DataTypes.ENUM,
      values: ['CUSTOMER', 'SELLER'],
      defaultValue: 'CUSTOMER',
      field: 'account_type',
    },
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    firstName: { type: DataTypes.STRING(50), field: 'first_name' },
    lastName: { type: DataTypes.STRING(50), field: 'last_name' },
    avatarUrl: { type: DataTypes.STRING, field: 'avatar_url' },
  },
  {
    sequelize: DbConn.sequelize,
    modelName: 'users',
    freezeTableName: true,
  }
);

// Hooks
Users.addHook('beforeCreate', async (user, options) => {
  const hashedPassword = await bycrpt.hash(user.password, parseInt(HASH_SALT));
  user.password = hashedPassword;
});

export default Users;

// return User;
