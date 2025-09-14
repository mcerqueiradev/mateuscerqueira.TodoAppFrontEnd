import { AuditableEntity, IEntity } from './base.model';
import { Guid } from './guid.model';
import { User } from './user.model';

export interface ToDoItem extends AuditableEntity, IEntity<Guid> {
  id: Guid;
  title: string;
  description?: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt?: Date;
  userId?: Guid;
  userName?: string;
  user?: User;
}

// Tipo para criar um novo ToDoItem (sem id e datas)
export interface CreateToDoItemRequest {
  title: string;
  description?: string;
  userId?: Guid;
}

// Tipo para atualizar um ToDoItem
export interface UpdateToDoItemRequest {
  title?: string;
  description?: string;
  isCompleted?: boolean;
  userId?: Guid;
}
