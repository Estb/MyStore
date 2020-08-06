module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define("store", {
    storeId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    cnpj: {
      allowNull: false,
      type: DataTypes.STRING(60)
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(60)
    },
    corporatName: {
      allowNull: false,
      type: DataTypes.STRING(60)
    }
  },  { underscored: false, freezeTableName: true })
  Store.associate = (models)=> {
    Store.hasMany(models.stock, {
        foreignKey: 'storeId'
    });
};
  return Store
}