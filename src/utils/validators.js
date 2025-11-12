const { body, query } = require('express-validator');

const signupValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
];

const productCreateValidation = [
  body('name').notEmpty(),
  body('price').isFloat({ gt: 0 }),
  body('stock').isInt({ min: 0 }),
  body('categoryId').optional().isInt()
];

const categoryValidation = [ body('name').notEmpty() ];

const productListValidation = [
  query('minPrice').optional().isFloat({ gt: 0 }),
  query('maxPrice').optional().isFloat({ gt: 0 }),
  query('category').optional().isInt(),
  query('q').optional().isString(),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1 })
];

module.exports = {
  signupValidation,
  productCreateValidation,
  categoryValidation,
  productListValidation
};
