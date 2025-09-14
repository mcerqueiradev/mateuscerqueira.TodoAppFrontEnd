import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  @Output() viewChanged = new EventEmitter<string>();

  currentView: string = 'list';

  menuItems = [
    {
      view: 'list',
      label: 'Task List',
      icon: 'M4 6h16M4 10h16M4 14h16M4 18h16',
    },
    {
      view: 'form',
      label: 'Add Task',
      icon: 'M12 4v16m8-8H4',
    },
    {
      view: 'loading',
      label: 'Loading',
      icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    },
    {
      view: 'error',
      label: 'Error',
      icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
  ];

  switchView(view: string) {
    this.currentView = view;
    this.viewChanged.emit(view);
  }
}
