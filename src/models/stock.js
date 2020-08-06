module.exports = (sequelize, DataTypes)=>{
const Stock = sequelize.define("stock", {
  productoId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(30),
  },
  sku: {
    allowNull: false,
    type: DataTypes.STRING(30),
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING(30),
  },
  category: {
    allowNull: false,
    type: DataTypes.STRING(30),
  },
  priceUnit: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  forecastSale: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  status: {
    allowNull: true,
    type: DataTypes.STRING(30),
  },
  isActive: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
    defaultValue: true
  } 
}, { underscored: false, freezeTableName: true });
return Stock
}
