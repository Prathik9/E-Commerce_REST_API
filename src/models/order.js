module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Order', {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      userId: { type: DataTypes.UUID, allowNull: false },
      total: { type: DataTypes.FLOAT, allowNull: false },
      items: { type: DataTypes.JSONB, allowNull: false }, // snapshot of order items {productId, name, qty, price}
      status: { type: DataTypes.ENUM('created','processing','completed','cancelled'), defaultValue: 'created' }
    });
  };
  