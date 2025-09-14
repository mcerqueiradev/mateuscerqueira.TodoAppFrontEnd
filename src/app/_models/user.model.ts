import { AuditableEntity, IEntity } from './base.model';
import { UserRole } from './enums.model';
import { PersonalName, Email, PasswordHash } from './value-objects.model';
import { ToDoItem } from './todo-item.model';
import { Guid } from './guid.model';

export interface User extends AuditableEntity, IEntity<Guid> {
  id: Guid;
  name: PersonalName;
  email: Email;
  role: UserRole;
  password: PasswordHash;
  isActive: boolean;
  lastLoginDate?: Date;
  toDoItems: ToDoItem[];
}

// Tipo para criar um novo User
export interface CreateUserRequest {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  fullName?: string;
  role?: string;
}

// Tipo para atualizar um User
export interface UpdateUserRequest {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
  isActive?: boolean;
}

// Tipo para login
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  token: string;
  userId: string;
  fullName: string;
  email: string;
  role: string;
  expiresAt: string;
}
