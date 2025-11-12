const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Product = require('./product');
const Category = require('./category');
const Cart = require('./cart');
const CartItem = require('./cartItem');
const Order = require('./order');

const models = {
  User: User(sequelize, Sequelize.DataTypes),
  Product: Product(sequelize, Sequelize.DataTypes),
  Category: Category(sequelize, Sequelize.DataTypes),
  Cart: Cart(sequelize, Sequelize.DataTypes),
  CartItem: CartItem(sequelize, Sequelize.DataTypes),
  Order: Order(sequelize, Sequelize.DataTypes)
};

// Associations
models.Category.hasMany(models.Product, { foreignKey: 'categoryId' });
models.Product.belongsTo(models.Category, { foreignKey: 'categoryId' });

models.User.hasOne(models.Cart, { foreignKey: 'userId' });
models.Cart.belongsTo(models.User, { foreignKey: 'userId' });

models.Cart.hasMany(models.CartItem, { foreignKey: 'cartId', onDelete: 'CASCADE' });
models.CartItem.belongsTo(models.Cart, { foreignKey: 'cartId' });

models.Product.hasMany(models.CartItem, { foreignKey: 'productId' });
models.CartItem.belongsTo(models.Product, { foreignKey: 'productId' });

// Orders – a simple order model storing JSON of items
models.User.hasMany(models.Order, { foreignKey: 'userId' });
models.Order.belongsTo(models.User, { foreignKey: 'userId' });

module.exports = { sequelize, Sequelize, ...models };

// If run directly, sync DB (for dev)
if (require.main === module) {
  (async () => {
    try {
      await sequelize.sync({ alter: true });
      console.log('DB synced');
      process.exit(0);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  })();
}
