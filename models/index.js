import Sequelize from 'sequelize';
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config');

const dbConfig = config[env];
const db = {};

const sequelizeConnInstance = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

try {
  sequelizeConnInstance.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

db.sequelize = sequelizeConnInstance;
db.Sequelize = Sequelize;

export default db;
