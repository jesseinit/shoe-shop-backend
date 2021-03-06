require('dotenv').config();

const {
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_PORT,
  DATABASE_URL,
  DATABASE_URL_TEST,
} = process.env;

module.exports = {
  development: {
    URL: DATABASE_URL,
    host: DB_HOST,
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASS,
    port: DB_PORT,
    dialect: 'postgres',
    config: {},
  },
  test: {
    URL: DATABASE_URL_TEST,
    username: 'postgres',
    password: 'postgres',
    database: 'storemanager_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    config: {
      logging: false,
    },
  },
  production: {
    URL: DATABASE_URL,
    host: DB_HOST,
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASS,
    port: DB_PORT,
    dialect: 'postgres',
  },
};
