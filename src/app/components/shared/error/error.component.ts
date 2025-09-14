import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error.component.html',
})
export class ErrorComponent {
  @Input() message = 'Ocorreu um erro';
  @Input() showRetry = false;
  @Output() retry = new EventEmitter<void>();

  onRetry() {
    this.retry.emit();
  }
}
