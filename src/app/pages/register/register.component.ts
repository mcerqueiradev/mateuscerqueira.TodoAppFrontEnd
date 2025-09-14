import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { CreateUserRequest } from '../../_models/user.model';
import { LoadingComponent } from '../../components/shared/loading/loading.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  userData: CreateUserRequest = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  confirmPassword = '';
  loading = false;
  error = '';
  success = false;

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    // Validações
    if (
      !this.userData.firstName ||
      !this.userData.lastName ||
      !this.userData.email ||
      !this.userData.password
    ) {
      this.error = 'Please fill in all fields';
      return;
    }

    if (this.userData.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    if (this.userData.password.length < 6) {
      this.error = 'Password must be at least 6 characters long';
      return;
    }

    this.loading = true;
    this.error = '';

    // Criar fullName a partir do firstName e lastName
    const registerData: CreateUserRequest = {
      ...this.userData,
      fullName: `${this.userData.firstName} ${this.userData.lastName}`,
    };

    this.userService.create(registerData).subscribe({
      next: (user) => {
        this.loading = false;
        this.success = true;

        // Redirecionar para login após 2 segundos
        setTimeout(() => {
          this.router.navigate(['/login'], {
            queryParams: { registered: true },
          });
        }, 2000);
      },
      error: (error) => {
        this.loading = false;
        this.error =
          error.error?.message || 'Registration failed. Please try again.';
        console.error('Registration error:', error);
      },
    });
  }

  onLoginRedirect() {
    this.router.navigate(['/login']);
  }
}
