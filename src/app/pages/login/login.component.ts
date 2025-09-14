import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { LoadingComponent } from '../../components/shared/loading/loading.component';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: '',
    rememberMe: false,
  };

  loading = false;
  error = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['registered']) {
        this.error = '';
      }
    });
  }

  onSubmit() {
    this.userService.login(this.credentials).subscribe({
      next: (response) => {
        this.loading = false;

        const userData = {
          id: response.userId,
          email: response.email,
          fullName: response.fullName,
          role: response.role,
          isActive: true,
          createdAt: new Date(),
          lastLogin: new Date(),
        };

        sessionStorage.setItem('authToken', response.token);
        sessionStorage.setItem('user', JSON.stringify(userData));
        sessionStorage.setItem('tokenExpiry', response.expiresAt);

        this.authService.login(response.token, userData);

        this.router.navigate(['/']);
      },
      error: (error) => {
        this.loading = false;
        this.error = 'Login failed. Please check your credentials.';
      },
    });
  }

  onForgotPassword() {
    console.log('Forgot password clicked');
  }

  onCreateAccount() {
    this.router.navigate(['/register']);
  }
}
