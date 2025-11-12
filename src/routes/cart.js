const router = require('express').Router();
const auth = require('../middleware/auth');
const cartController = require('../controllers/cartController');

router.use(auth);
router.get('/', cartController.getCart);
router.post('/items', cartController.addToCart);
router.delete('/items/:itemId', cartController.removeFromCart);

module.exports = router;
