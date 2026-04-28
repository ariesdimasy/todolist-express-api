import { TodoRepository } from "../repositories/todo.repository";
import { CreateTodoDto, UpdateTodoDto } from "../models/todo.model";

// =============================================
// Todo Service — Business Logic Layer
// =============================================

export class TodoService {
  private readonly todoRepository: TodoRepository;

  constructor() {
    this.todoRepository = new TodoRepository();
  }

  /**
   * Get all todos
   */
  async getAllTodos() {
    return await this.todoRepository.findAll();
  }

  /**
   * Get a single todo by ID
   * Throws an error if the todo is not found
   */
  async getTodoById(id: number) {
    const todo = await this.todoRepository.findById(id);

    if (!todo) {
      throw new Error(`Todo dengan ID ${id} tidak ditemukan`);
    }

    return todo;
  }

  /**
   * Create a new todo
   * Validates required fields before persisting
   */
  async createTodo(data: CreateTodoDto) {
    if (!data.title || data.title.trim() === "") {
      throw new Error("Title tidak boleh kosong");
    }

    if (!data.desc || data.desc.trim() === "") {
      throw new Error("Description tidak boleh kosong");
    }

    return await this.todoRepository.create({
      title: data.title.trim(),
      desc: data.desc.trim(),
      done: data.done ?? false,
    });
  }

  /**
   * Update an existing todo by ID
   * Validates that the todo exists and at least one field is provided
   */
  async updateTodo(id: number, data: UpdateTodoDto) {
    // Check if todo exists
    await this.getTodoById(id);

    if (Object.keys(data).length === 0) {
      throw new Error("Minimal satu field harus diisi untuk update");
    }

    const updateData: UpdateTodoDto = {};

    if (data.title !== undefined) {
      if (data.title.trim() === "") {
        throw new Error("Title tidak boleh kosong");
      }
      updateData.title = data.title.trim();
    }

    if (data.desc !== undefined) {
      if (data.desc.trim() === "") {
        throw new Error("Description tidak boleh kosong");
      }
      updateData.desc = data.desc.trim();
    }

    if (data.done !== undefined) {
      updateData.done = data.done;
    }

    return await this.todoRepository.update(id, updateData);
  }

  /**
   * Delete a todo by ID
   * Validates that the todo exists before deleting
   */
  async deleteTodo(id: number) {
    // Check if todo exists first
    await this.getTodoById(id);

    return await this.todoRepository.delete(id);
  }
}
