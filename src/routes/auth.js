const express = require('express');
const router = express.Router();
const { signupValidationRules, loginValidationRules, validate } = require('../middleware/validate');
const { signup, login } = require('../controllers/authController');

router.post('/signup', signupValidationRules, validate, signup);
router.post('/login', loginValidationRules, validate, login);

module.exports = router;
