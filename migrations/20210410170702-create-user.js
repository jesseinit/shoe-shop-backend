'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      state: {
        type: Sequelize.ENUM,
        values: ['ACTIVE', 'DELETED', 'PENDING'],
        defaultValue: 'PENDING',
      },
      account_type: {
        type: Sequelize.ENUM,
        values: ['CUSTOMER', 'SELLER'],
        defaultValue: 'CUSTOMER',
      },
      email: {
        type: Sequelize.STRING,
        validate: { isEmail: true },
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      first_name: Sequelize.STRING(50),
      last_name: Sequelize.STRING(50),
      avatar_url: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  },
};
