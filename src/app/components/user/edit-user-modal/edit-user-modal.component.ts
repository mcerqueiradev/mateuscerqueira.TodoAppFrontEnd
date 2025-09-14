import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateUserRequest } from '../../../_models/user.model';
import { UserService } from '../../../_services/user.service';

@Component({
  selector: 'app-edit-user-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css'],
})
export class EditUserModalComponent {
  @Input() user: any = null;
  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<any>();

  editData: UpdateUserRequest = {
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    isActive: true,
  };

  showPasswordFields = false;
  loading = false;
  error = '';
  success = '';

  constructor(private userService: UserService) {}

  ngOnChanges() {
    if (this.user) {
      this.editData = {
        userId: this.user.id,
        firstName:
          this.user.firstName || this.extractFirstName(this.user.fullName),
        lastName:
          this.user.lastName || this.extractLastName(this.user.fullName),
        email: this.user.email,
        currentPassword: '',
        newPassword: '',
        isActive: this.user.isActive !== undefined ? this.user.isActive : true,
      };
    }
  }

  private extractFirstName(fullName: string): string {
    return fullName ? fullName.split(' ')[0] : '';
  }

  private extractLastName(fullName: string): string {
    const parts = fullName ? fullName.split(' ') : [];
    return parts.length > 1 ? parts.slice(1).join(' ') : '';
  }

  onSubmit() {
    this.error = '';
    this.success = '';

    // Validações básicas
    if (
      !this.editData.firstName ||
      !this.editData.lastName ||
      !this.editData.email
    ) {
      this.error = 'Please fill in all required fields';
      return;
    }

    if (this.showPasswordFields) {
      if (!this.editData.currentPassword) {
        this.error = 'Current password is required to change password';
        return;
      }
      if (this.editData.newPassword && this.editData.newPassword.length < 6) {
        this.error = 'New password must be at least 6 characters long';
        return;
      }
    }

    this.loading = true;

    const updateData: UpdateUserRequest = { ...this.editData };
    if (!this.showPasswordFields) {
      delete updateData.currentPassword;
      delete updateData.newPassword;
    }

    this.userService.update(this.user.id, updateData).subscribe({
      next: (updatedUser) => {
        this.loading = false;
        this.success = 'Profile updated successfully!';

        // Emitir evento com usuário atualizado
        setTimeout(() => {
          this.saved.emit(updatedUser);
          this.close();
        }, 1500);
      },
      error: (error) => {
        this.loading = false;
        this.error =
          error.error?.message || 'Failed to update profile. Please try again.';
        console.error('Update error:', error);
      },
    });
  }

  togglePasswordFields() {
    this.showPasswordFields = !this.showPasswordFields;
    if (!this.showPasswordFields) {
      this.editData.currentPassword = '';
      this.editData.newPassword = '';
    }
  }

  close() {
    this.closed.emit();
  }
}
