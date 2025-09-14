import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToDoItem } from '../../../_models/todo-item.model';
import { TodoService } from '../../../_services/todo.service';
import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: ToDoItem;
  @Output() deleted = new EventEmitter<string>();
  @Output() updated = new EventEmitter<ToDoItem>();

  isEditing = false;
  editTitle = '';
  editDescription = '';
  currentUser: any = null;

  loading = false;
  success = '';
  error = '';
  info = '';

  constructor(
    private todoService: TodoService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

  hasUserName(): boolean {
    return !!(this.todo as any).userName;
  }

  getUserName(): string {
    return (this.todo as any).userName || '';
  }

  toggleComplete() {
    this.loading = true;
    this.error = '';
    this.success = '';
    this.info = '';

    const currentUser = this.authService.getCurrentUser();
    const userId = currentUser?.id;

    if (!userId) {
      this.info = 'Note: Completing task without user association';
    }

    this.todoService.markAsComplete(this.todo.id, userId).subscribe({
      next: (updatedTodo) => {
        this.loading = false;
        const action = updatedTodo.isCompleted
          ? 'completed'
          : 'marked as pending';
        this.success = `Task ${action} successfully!`;

        if (!userId) {
          this.success += ' (without user association)';
        }

        setTimeout(() => {
          this.success = '';
          this.info = '';
        }, 2500);

        this.updated.emit(updatedTodo);
      },
      error: (error) => {
        this.loading = false;
        this.error = 'Failed to update task. Please try again.';
        console.error('Error updating task:', error);
        setTimeout(() => {
          this.error = '';
          this.info = '';
        }, 2500);
      },
    });
  }

  deleteTodo() {
    if (!confirm('Are you sure you want to delete this task?')) return;

    this.loading = true;
    this.todoService.delete(this.todo.id).subscribe({
      next: (msg) => {
        this.loading = false;
        this.success = msg || 'Task deleted successfully!';
        this.deleted.emit(this.todo.id);
        setTimeout(() => (this.success = ''), 2500);
      },
      error: (error) => {
        this.loading = false;
        this.error = 'Failed to delete task.';
        console.error('Erro ao deletar tarefa:', error);
        setTimeout(() => (this.error = ''), 2500);
      },
    });
  }

  startEdit() {
    this.editTitle = this.todo.title;
    this.editDescription = this.todo.description || '';
    this.isEditing = true;
  }

  saveEdit() {
    if (!this.editTitle.trim()) return;

    this.loading = true;
    const updatedData = {
      id: this.todo.id,
      title: this.editTitle.trim(),
      userId: this.todo.userId || this.currentUser.id,
      description: this.editDescription.trim() || undefined,
    };

    this.todoService.update(this.todo.id, updatedData).subscribe({
      next: (updatedTodo) => {
        this.loading = false;
        this.success = 'Task updated successfully!';
        this.updated.emit(updatedTodo);
        this.isEditing = false;
        setTimeout(() => (this.success = ''), 1500);
      },
      error: (error) => {
        this.loading = false;
        this.error = 'Failed to update task. Please try again.';
        console.error('Error updating task:', error);
        setTimeout(() => (this.error = ''), 2500);
      },
    });
  }

  cancelEdit() {
    this.isEditing = false;
  }
}
