'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("store", {
      storeId: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      cnpj: {
        allowNull: false,
        type: Sequelize.STRING(60)
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(60)
      },
      corporatName: {
        allowNull: false,
        type: Sequelize.STRING(60)
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt:{
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt:{
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("store");
  }
};
