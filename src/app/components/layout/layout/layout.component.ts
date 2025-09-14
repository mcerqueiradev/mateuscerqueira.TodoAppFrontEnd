import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from '../../todo/todo-list/todo-list.component';
import { TodoFormComponent } from '../../todo/todo-form/todo-form.component';
import { TodoItemComponent } from '../../todo/todo-item/todo-item.component';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { ErrorComponent } from '../../shared/error/error.component';
import { NavComponent } from '../../shared/nav/nav.component';
import { ToDoItem } from '../../../_models/todo-item.model';
import { AuthService } from '../../../_services/auth.service';
import { Router } from '@angular/router';
import { UserProfileComponent } from '../../user/user-profile/user-profile.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    TodoListComponent,
    TodoFormComponent,
    TodoItemComponent,
    LoadingComponent,
    ErrorComponent,
    NavComponent,
    UserProfileComponent,
  ],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  currentView: string = 'list';
  currentUser: any = null;
  showUserProfile = false;
  reloadList: boolean = false;
  todos: ToDoItem[] = [];
  mobileViews = [
    { id: 'list', label: 'Tasks' },
    { id: 'form', label: 'Add Task' },
    { id: 'item', label: 'Task Details' },
  ];

  testTodo: ToDoItem = {
    id: '1',
    title: 'Tarefa de Teste',
    description: 'Esta é uma tarefa de exemplo para teste',
    isCompleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 'user-123',
  };

  constructor(private authService: AuthService, private router: Router) {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    this.authService.getUserObservable().subscribe((user) => {
      this.currentUser = user;
    });
  }

  logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  onViewChanged(view: string) {
    this.currentView = view;
  }

  switchView(view: string) {
    this.currentView = view;
  }

  onTodoCreated() {
    this.reloadList = true;
    setTimeout(() => (this.reloadList = false), 100);
  }

  onTodoDeleted(todoId: string) {
    this.reloadList = true;
    setTimeout(() => (this.reloadList = false), 100);
  }

  onTodoUpdated(todo: ToDoItem) {
    this.reloadList = true;
    setTimeout(() => (this.reloadList = false), 100);
  }

  onRetry() {
    this.reloadList = true;
    setTimeout(() => (this.reloadList = false), 100);
  }

  onUserProfileClick() {
    this.showUserProfile = !this.showUserProfile;
    this.currentView = 'profile';
  }
}
