import Sequelize from 'sequelize';
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config');

const dbConfig = config[env];
const db = {};

const sequelizeConnInstance = new Sequelize(dbConfig.URL);

db.sequelize = sequelizeConnInstance;
db.Sequelize = Sequelize;

export default db;
