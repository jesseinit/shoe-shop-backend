require('dotenv').config();

const { DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT, DATABASE_URL, ENV } = process.env;
module.exports = {
  development: {
    URL: DATABASE_URL,
    host: DB_HOST,
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASS,
    port: DB_PORT,
    dialect: 'postgres',
  },
  test: {
    username: 'postgres',
    password: 'postgres',
    database: 'storemanager_test',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'postgres',
    password: null,
    database: 'storemanager_production',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};
