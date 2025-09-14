import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../../_services/todo.service';
import { ToDoItem } from '../../../_models/todo-item.model';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { ErrorComponent } from '../../shared/error/error.component';
import { PaginatedResponse } from '../../../_models/response.model';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../_services/auth.service'; // ✅ Import AuthService

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, LoadingComponent, ErrorComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit, OnDestroy, OnChanges {
  private subscription: Subscription | null = null;
  @Input() reloadList: boolean = false;
  todos: ToDoItem[] = [];
  filteredTodos: ToDoItem[] = [];
  loading = false;
  error = '';
  filter: 'all' | 'completed' | 'pending' = 'all';
  searchTerm = '';

  // Pagination properties
  currentPage = 1;
  pageSize = 20;
  totalCount = 0;
  totalPages = 0;
  hasPreviousPage = false;
  hasNextPage = false;

  currentUser: any = null;

  constructor(
    private todoService: TodoService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadCurrentUser();
    this.loadTodos();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['reloadList'] && this.reloadList) {
      this.loadTodos();
    }
  }

  private loadCurrentUser() {
    this.currentUser = this.authService.getCurrentUser();
  }

  loadTodos() {
    this.loading = true;
    this.error = '';
    let apiCall: Observable<PaginatedResponse<ToDoItem>>;

    if (this.currentUser && this.currentUser.id) {
      apiCall = this.todoService.getByUserId(
        this.currentUser.id,
        this.currentPage,
        this.pageSize
      );
    } else {
      apiCall = this.todoService.getAll(this.currentPage, this.pageSize);
    }

    this.subscription = apiCall.subscribe({
      next: (response: PaginatedResponse<ToDoItem>) => {
        this.todos = response.items || [];
        this.totalCount = response.totalCount;
        this.totalPages = response.totalPages;
        this.hasPreviousPage = response.hasPreviousPage;
        this.hasNextPage = response.hasNextPage;

        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading tasks. Please try again.';
        this.loading = false;
        console.error('Error:', error);
      },
    });
  }

  applyFilters() {
    let filtered = this.todos;

    if (this.filter === 'completed') {
      filtered = filtered.filter((todo) => todo.isCompleted);
    } else if (this.filter === 'pending') {
      filtered = filtered.filter((todo) => !todo.isCompleted);
    }

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (todo) =>
          todo.title.toLowerCase().includes(term) ||
          (todo.description && todo.description.toLowerCase().includes(term))
      );
    }

    filtered = filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    this.filteredTodos = filtered;
  }

  trackByTodoId(index: number, todo: ToDoItem): string {
    return todo.id;
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;
    this.loadTodos();
  }

  onFilterChange(filter: 'all' | 'completed' | 'pending') {
    this.filter = filter;
    this.applyFilters();
  }

  onSearchChange(term: string) {
    this.searchTerm = term;
    this.applyFilters();
  }

  onTodoCreated() {
    this.currentPage = 1;
    this.loadTodos();
  }

  onTodoDeleted(deletedId: string) {
    this.todos = this.todos.filter((todo) => todo.id !== deletedId);
    this.applyFilters();

    if (this.todos.length === 0 && this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }

  onTodoUpdated(updatedTodo: ToDoItem) {
    const index = this.todos.findIndex((t) => t.id === updatedTodo.id);
    if (index !== -1) {
      this.todos[index] = updatedTodo;
      this.applyFilters();
    }
  }

  getStats() {
    const total = this.todos.length;
    const completed = this.todos.filter((t) => t.isCompleted).length;
    const pending = total - completed;

    return { total, completed, pending };
  }

  retryLoad() {
    this.loadTodos();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
