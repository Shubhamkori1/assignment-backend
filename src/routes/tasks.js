const express = require('express');
const router = express.Router();
const { taskValidationRules, validate } = require('../middleware/validate');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const auth = require('../middleware/auth');

router.post('/',auth,taskValidationRules, validate, createTask);
router.get('/', auth,getTasks);
router.put('/:id', auth,taskValidationRules, validate, updateTask);
router.delete('/:id', auth,deleteTask);

module.exports = router;
