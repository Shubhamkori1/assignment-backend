const express = require('express');
const router = express.Router();
const { taskValidationRules, validate } = require('../middleware/validate');
const controller = require('../controllers/taskController');

router.post('/', taskValidationRules, validate, controller.createTask);
router.get('/', controller.getTasks);
router.put('/:id', taskValidationRules, validate, controller.updateTask);
router.delete('/:id', controller.deleteTask);

module.exports = router;
