const express = require('express');
const protect = require('../middleware/authMiddleware');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getSubtasks,
  updateSubtasks,
  deleteSubtask
} = require('../controllers/taskController');

const router = express.Router();

router.use(protect);

// Task routes
router.get('/', getTasks);
router.post('/', createTask);
router.put('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

// Subtask routes
router.get('/:taskId/subtasks', getSubtasks);
router.put('/:taskId/subtasks', updateSubtasks);
router.delete('/:taskId/subtasks/:subtaskId', deleteSubtask);

module.exports = router;