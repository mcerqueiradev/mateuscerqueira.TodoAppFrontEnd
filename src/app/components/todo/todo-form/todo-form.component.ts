import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../../_services/todo.service';
import { CreateToDoItemRequest } from '../../../_models/todo-item.model';
import { AuthService } from '../../../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-form.component.html',
})
export class TodoFormComponent implements OnInit {
  @Output() created = new EventEmitter<void>();

  title = '';
  description = '';
  isSubmitting = false;
  currentUser: any | null = null;

  errors = {
    title: '',
    description: '',
    general: '',
  };

  showErrors = false;
  successMessage = '';

  constructor(
    private todoService: TodoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

  validateForm(): boolean {
    this.errors = { title: '', description: '', general: '' };
    let isValid = true;

    if (!this.title.trim()) {
      this.errors.title = 'Title is required';
      isValid = false;
    } else if (this.title.trim().length < 3) {
      this.errors.title = 'Title must be at least 3 characters long';
      isValid = false;
    } else if (this.title.trim().length > 200) {
      this.errors.title = 'Title cannot exceed 200 characters';
      isValid = false;
    }

    if (this.description.trim().length > 1000) {
      this.errors.description = 'Description cannot exceed 1000 characters';
      isValid = false;
    }

    return isValid;
  }

  clearErrors() {
    this.errors = { title: '', description: '', general: '' };
    this.showErrors = false;
    this.successMessage = '';
  }

  resetForm() {
    this.title = '';
    this.description = '';
    this.clearErrors();
  }

  onInputChange(field: string) {
    if (this.showErrors) {
      this.validateForm();
    }
  }

  onSubmit() {
    this.clearErrors();

    if (!this.validateForm()) {
      this.showErrors = true;
      return;
    }

    this.isSubmitting = true;

    const newTodo: CreateToDoItemRequest = {
      title: this.title.trim(),
      description: this.description.trim(),
    };

    if (this.currentUser && this.currentUser.id) {
      newTodo.userId = this.currentUser.id;
    }

    this.todoService.create(newTodo).subscribe({
      next: (createdTask) => {
        this.isSubmitting = false;

        this.successMessage = 'Task created successfully!';

        setTimeout(() => {
          this.resetForm();
          this.router.navigate(['/']);
          this.created.emit();
        }, 1500);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errors.general =
          error.error?.message || 'Failed to create task. Please try again.';
      },
    });
  }
}
