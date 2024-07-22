import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityStore, CalendarComponent } from '@test-cra/shared';

@Component({
  selector: 'lib-manager',
  standalone: true,
  imports: [CommonModule, CalendarComponent],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css',
})
export class ManagerComponent {
  public readonly store = inject(ActivityStore);
}
