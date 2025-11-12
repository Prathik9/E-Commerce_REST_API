const { Cart, CartItem, Product } = require('../models');

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ where: { userId: req.user.id }, include: { model: CartItem, include: Product } });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json(cart);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.stock < quantity) return res.status(400).json({ message: 'Not enough stock' });

    const cart = await Cart.findOne({ where: { userId: req.user.id } });
    // If no cart exists (should), create
    if (!cart) throw new Error('Cart not found');

    // If item exists, increment quantity (but preserve original priceAtAdd)
    let item = await CartItem.findOne({ where: { cartId: cart.id, productId } });
    if (item) {
      item.quantity += parseInt(quantity);
      await item.save();
    } else {
      item = await CartItem.create({
        cartId: cart.id,
        productId,
        quantity,
        priceAtAdd: product.price // persistent snapshot
      });
    }
    res.status(201).json(item);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ where: { userId: req.user.id } });
    const item = await CartItem.findByPk(req.params.itemId);
    if (!item || item.cartId !== cart.id) return res.status(404).json({ message: 'Item not found' });
    await item.destroy();
    res.json({ message: 'Removed' });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};
