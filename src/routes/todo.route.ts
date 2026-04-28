import { Router } from "express";
import { TodoController } from "../controllers/todo.controller";

// =============================================
// Todo Router
// =============================================

const router = Router();
const todoController = new TodoController();

/**
 * @route   GET /todos
 * @desc    Get all todos
 * @access  Public
 */
router.get("/", todoController.getAll);

/**
 * @route   GET /todos/:id
 * @desc    Get a single todo by ID
 * @access  Public
 */
router.get("/:id", todoController.getById);

/**
 * @route   POST /todos
 * @desc    Create a new todo
 * @access  Public
 * @body    { title: string, desc: string, done?: boolean }
 */
router.post("/", todoController.create);

/**
 * @route   PUT /todos/:id
 * @desc    Update a todo by ID
 * @access  Public
 * @body    { title?: string, desc?: string, done?: boolean }
 */
router.put("/:id", todoController.update);

/**
 * @route   DELETE /todos/:id
 * @desc    Delete a todo by ID
 * @access  Public
 */
router.delete("/:id", todoController.delete);

export default router;
