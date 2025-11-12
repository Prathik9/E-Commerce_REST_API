const router = require('express').Router();
const { signup, login } = require('../controllers/authController');
const { signupValidation } = require('../utils/validators');
const { validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
  next();
};

router.post('/signup', signupValidation, handleValidation, signup);
router.post('/login', login);

module.exports = router;
