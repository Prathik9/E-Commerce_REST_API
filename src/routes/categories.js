const router = require('express').Router();
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');
const { create, update, remove, list } = require('../controllers/categoryController');
const { categoryValidation } = require('../utils/validators');
const { validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
  next();
};

router.get('/', list);
router.post('/', auth, requireRole('admin'), categoryValidation, handleValidation, create);
router.put('/:id', auth, requireRole('admin'), update);
router.delete('/:id', auth, requireRole('admin'), remove);

module.exports = router;
