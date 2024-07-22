import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CalendarWeekComponent } from '../calendar-week/calendar-week.component';
import { ActivityStore } from '../../store/activity.store';

@Component({
  selector: 'lib-calendar',
  standalone: true,
  imports: [
    CalendarWeekComponent
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
  public readonly days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  public store = inject(ActivityStore);

  public ngOnInit(): void {
    this.loadActivities()
      .then(() =>  {
        this.store.createWeeks();
      });
  }

  public changeMonth(value: number): void {
    this.store.changeMonthStore(value);
  }

  public async loadActivities() {
    await this.store.loadActivities();
  }
}
