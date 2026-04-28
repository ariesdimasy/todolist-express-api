import { Request, Response, NextFunction } from "express";
import { TodoService } from "../services/todo.service";

// =============================================
// Todo Controller — Request/Response Handlers
// =============================================

export class TodoController {
  private readonly todoService: TodoService;

  constructor() {
    this.todoService = new TodoService();

    // Bind methods to preserve 'this' context when used as route handlers
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  /**
   * GET /todos
   * Retrieve all todos
   */
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const todos = await this.todoService.getAllTodos();

      res.status(200).json({
        success: true,
        message: "Berhasil mengambil semua todo",
        data: todos,
        total: todos.length,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /todos/:id
   * Retrieve a single todo by ID
   */
  async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = parseInt(String(req.params.id), 10);

      if (isNaN(id) || id <= 0) {
        res.status(400).json({
          success: false,
          message: "ID harus berupa angka positif",
        });
        return;
      }

      const todo = await this.todoService.getTodoById(id);

      res.status(200).json({
        success: true,
        message: "Berhasil mengambil todo",
        data: todo,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /todos
   * Create a new todo
   */
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, desc, done } = req.body;

      const todo = await this.todoService.createTodo({ title, desc, done });

      res.status(201).json({
        success: true,
        message: "Todo berhasil dibuat",
        data: todo,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /todos/:id
   * Update an existing todo
   */
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(String(req.params.id), 10);

      if (isNaN(id) || id <= 0) {
        res.status(400).json({
          success: false,
          message: "ID harus berupa angka positif",
        });
        return;
      }

      const { title, desc, done } = req.body;

      const todo = await this.todoService.updateTodo(id, { title, desc, done });

      res.status(200).json({
        success: true,
        message: "Todo berhasil diupdate",
        data: todo,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /todos/:id
   * Delete a todo by ID
   */
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(String(req.params.id), 10);

      if (isNaN(id) || id <= 0) {
        res.status(400).json({
          success: false,
          message: "ID harus berupa angka positif",
        });
        return;
      }

      await this.todoService.deleteTodo(id);

      res.status(200).json({
        success: true,
        message: "Todo berhasil dihapus",
      });
    } catch (error) {
      next(error);
    }
  }
}
