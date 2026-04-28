// =============================================
// Todo Model — Type & Interface Definitions
// =============================================

export interface Todo {
  id: number;
  title: string;
  desc: string;
  done: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateTodoDto {
  title: string;
  desc: string;
  done?: boolean;
}

export interface UpdateTodoDto {
  title?: string;
  desc?: string;
  done?: boolean;
}

export interface TodoResponse<T = Todo | Todo[]> {
  success: boolean;
  message: string;
  data?: T;
}

export interface PaginatedTodoResponse {
  success: boolean;
  message: string;
  data: Todo[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
