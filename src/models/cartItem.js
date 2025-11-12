module.exports = (sequelize, DataTypes) => {
    return sequelize.define('CartItem', {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      cartId: { type: DataTypes.UUID, allowNull: false },
      productId: { type: DataTypes.INTEGER, allowNull: false },
      quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
      priceAtAdd: { type: DataTypes.FLOAT, allowNull: false } // persistent price
    });
  };
  