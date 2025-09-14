import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: LayoutComponent },
  { path: '**', redirectTo: '' },
];
