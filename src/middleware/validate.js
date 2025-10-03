const { body, validationResult } = require('express-validator');

const taskValidationRules = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  
  body('description')
    .optional()
    .isLength({ min: 5 }).withMessage('Description must be at least 5 characters'),
  
  body('status')
    .optional()
    .isIn(['pending', 'done']).withMessage('Status must be either pending or done')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  taskValidationRules,
  validate
};
