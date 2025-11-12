module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Cart', {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      userId: { type: DataTypes.UUID, allowNull: false }
    });
  };
  