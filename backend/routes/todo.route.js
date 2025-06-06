import express from 'express';
import { protectedData } from '../middlewares/protectedData.js';
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  updateComplete
} from '../controllers/todo.controller.js';

const router = express.Router();

router.post('/todo', protectedData, createTodo);
router.get('/todos', protectedData, getTodos);
router.put('/todo/:id', protectedData, updateTodo);
router.put('/complete/:id', protectedData, updateComplete);

router.delete('/todo/:id', protectedData, deleteTodo);

export default router;
