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

const passwordRules = body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[@$!%*?&]/).withMessage('Password must contain at least one special character (@$!%*?&)');

const signupValidationRules = [
    body('email').isEmail().withMessage('Invalid email'),
    passwordRules
];

const loginValidationRules = [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required')
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
    signupValidationRules,
    loginValidationRules,
    validate
};
