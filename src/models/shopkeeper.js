const store = require("../models/store");

module.exports = (sequelize, DataTypes) => {
  const Shopkeeper = sequelize.define(
    "shopkeeper",
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(255),
        validate: {
          len: [2, 255],
        },
      },
      lastname: {
        allowNull: false,
        type: DataTypes.STRING(255),
        validate: {
          len: [2, 255],
        },
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(255),
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
        type: DataTypes.STRING(255),
        validate: {
          len: [8, 255],
          //   isAlphanumeric:true
        },
      },
    },
    { underscored: false, freezeTableName: true }
  );
  Shopkeeper.associate = (models) => {
    Shopkeeper.hasMany(models.store, {
      foreignKey: "userId",
    });
  };
  return Shopkeeper;
};
