'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("stock", {
      productoId: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      sku: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      priceUnit: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      amount: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      forecastSale: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      status: {
        allowNull: true,
        type: Sequelize.STRING(30),
      },
      isActive: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      storeId: {
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
    return queryInterface.dropTable("stock");
  }
};
