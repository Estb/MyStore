"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("shopkeeper", {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
          len: [2, 255],
        },
      },
      lastname: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
          len: [2, 255],
        },
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(255),
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: "Must be a valid email",
          },
        },
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
          len: [8, 255],
          //   isAlphanumeric:true
        },
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("shopkeeper");
  },
};
