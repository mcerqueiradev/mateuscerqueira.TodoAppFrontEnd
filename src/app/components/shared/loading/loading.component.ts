import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
})
export class LoadingComponent {
  @Input() message = 'Carregando...';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
}
