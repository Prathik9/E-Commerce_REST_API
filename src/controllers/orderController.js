const { Cart, CartItem, Product, Order } = require('../models');

exports.placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ where: { userId: req.user.id } });
    if (!cart) return res.status(400).json({ message: 'Cart not found' });

    const items = await CartItem.findAll({ where: { cartId: cart.id } });
    if (!items.length) return res.status(400).json({ message: 'Cart empty' });

    // Build order items preserving priceAtAdd (persistent cart pricing)
    const orderItems = [];
    let total = 0;
    for (const it of items) {
      const product = await Product.findByPk(it.productId);
      if (product.stock < it.quantity) return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      // reduce stock
      product.stock -= it.quantity;
      await product.save();

      const itemTotal = it.priceAtAdd * it.quantity;
      orderItems.push({
        productId: it.productId,
        name: product.name,
        quantity: it.quantity,
        price: it.priceAtAdd,
        itemTotal
      });
      total += itemTotal;
    }

    const order = await Order.create({
      userId: req.user.id,
      total,
      items: orderItems
    });

    // clear cart
    await CartItem.destroy({ where: { cartId: cart.id } });

    res.status(201).json(order);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

exports.history = async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.user.id }, order: [['createdAt', 'DESC']] });
    res.json(orders);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

exports.adminListAll = async (req, res) => {
  try {
    // Admin-only route
    const orders = await Order.findAll({ order: [['createdAt', 'DESC']] });
    res.json(orders);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};
