module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Product', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      price: { type: DataTypes.FLOAT, allowNull: false },
      stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      imageUrl: { type: DataTypes.STRING, allowNull: true },
      categoryId: { type: DataTypes.INTEGER, allowNull: true }
    });
  };
  