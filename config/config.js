module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'storemanager_development',
    host: '127.0.0.1',
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
