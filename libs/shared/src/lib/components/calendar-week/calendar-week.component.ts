import { ChangeDetectionStrategy, Component, effect, input, InputSignal, OnChanges } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Activity } from '../../interfaces/activity.interface';
import { ActivityComponent } from '../activity/activity.component';

@Component({
  selector: 'lib-calendar-week',
  standalone: true,
  imports: [
    DatePipe,
    ActivityComponent
  ],
  templateUrl: './calendar-week.component.html',
  styleUrl: './calendar-week.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarWeekComponent {
  
  public week:InputSignal<Date[]> = input.required();
  public currentMonth: InputSignal<number> = input.required();
  public activities: InputSignal<Activity[]> = input.required();

  public isOtherMonth(day: Date): boolean {
    return day.getMonth() !== this.currentMonth();
  }

}
