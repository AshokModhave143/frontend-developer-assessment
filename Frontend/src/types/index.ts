export interface TodoItem extends BaseTodoItem {
  id: string;
}

export interface BaseTodoItem {
  description: string;
  isCompleted: boolean;
}
