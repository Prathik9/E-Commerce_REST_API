const router = require('express').Router();
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');
const orderController = require('../controllers/orderController');

router.use(auth);
router.post('/', orderController.placeOrder);
router.get('/me', orderController.history);
router.get('/', requireRole('admin'), orderController.adminListAll);

module.exports = router;
