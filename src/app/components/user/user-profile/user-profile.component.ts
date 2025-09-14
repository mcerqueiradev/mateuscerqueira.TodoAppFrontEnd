import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../_services/auth.service';
import { UserService } from '../../../_services/user.service';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';
import { TodoService } from '../../../_services/todo.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, EditUserModalComponent],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  currentUser: any = null;
  userStats = {
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  };
  loading = true;
  showEditModal = false;

  constructor(
    private authService: AuthService,
    private todoService: TodoService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.currentUser = this.authService.getCurrentUser();

    setTimeout(() => {
      this.userStats = {
        totalTasks: 24,
        completedTasks: 18,
        pendingTasks: 6,
      };
      this.loading = false;
    }, 1000);
  }

  getRoleLabel(role: string): string {
    switch (role) {
      case 'ROLE_MEMBER':
        return 'Member';
      case 'ROLE_MANAGER':
        return 'Manager';
      case 'ROLE_ADMIN':
        return 'Admin';
      default:
        return role;
    }
  }

  editProfile() {
    this.showEditModal = true;
  }

  changePassword() {
    this.showEditModal = true;
  }

  onUserSaved(updatedUser: any) {
    // Atualizar usuário no auth service e storage
    this.authService.login(this.authService.getToken()!, updatedUser);
    this.currentUser = updatedUser;
    this.showEditModal = false;
  }

  onModalClosed() {
    this.showEditModal = false;
  }
}
