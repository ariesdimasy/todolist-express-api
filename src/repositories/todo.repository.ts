import prisma from "../config/database";
import { CreateTodoDto, UpdateTodoDto } from "../models/todo.model";

// =============================================
// Todo Repository — Data Access Layer
// =============================================

export class TodoRepository {
  /**
   * Retrieve all todos from the database
   */
  async findAll() {
    return await prisma.todo.findMany({
      orderBy: { created_at: "desc" },
    });
  }

  /**
   * Retrieve a single todo by its ID
   */
  async findById(id: number) {
    return await prisma.todo.findUnique({
      where: { id },
    });
  }

  /**
   * Create a new todo record
   */
  async create(data: CreateTodoDto) {
    return await prisma.todo.create({
      data: {
        title: data.title,
        desc: data.desc,
        done: data.done ?? false,
      },
    });
  }

  /**
   * Update an existing todo record by ID
   */
  async update(id: number, data: UpdateTodoDto) {
    return await prisma.todo.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete a todo record by ID
   */
  async delete(id: number) {
    return await prisma.todo.delete({
      where: { id },
    });
  }

  /**
   * Count total todos
   */
  async count() {
    return await prisma.todo.count();
  }
}
