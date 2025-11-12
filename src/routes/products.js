const router = require('express').Router();
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // simple; production: cleanup / streaming
const productController = require('../controllers/productController');
const { productCreateValidation, productListValidation } = require('../utils/validators');
const { validationResult } = require('express-validator');


const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
  next();
};

router.get('/', productListValidation, handleValidation, productController.list);
router.get('/:id', productController.get);
router.post('/', auth, requireRole('admin'), upload.single('image'), productCreateValidation, handleValidation, productController.create);
router.put('/:id', auth, requireRole('admin'), upload.single('image'), productController.update);
router.delete('/:id', auth, requireRole('admin'), productController.remove);


module.exports = router;
