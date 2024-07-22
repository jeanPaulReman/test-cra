import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityStore, CalendarComponent, MISSIONS, UpdateActivity } from '@test-cra/shared';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-agent',
  standalone: true,
  imports: [CommonModule, CalendarComponent, FormsModule],
  templateUrl: './agent.component.html',
  styleUrl: './agent.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentComponent {
  public readonly store = inject(ActivityStore)
  public formResult = this.store.currentMonthWeek;
  public currentAgent = this.store.currentUser()?.name;



  public missions = MISSIONS;
  public statuses = [
    { value: 'active', label: 'Actif' },
    { value: 'rest', label: 'Repos' }
  ];

  public submitForm() {
    if (this.isValid()) {
      this.sendActivities();
    }
  }

  public isValid(): boolean {
    const allFilled = this.formResult().every((result) => result.status !== '');
    const isRest = this.formResult().some((result) => result.status === 'rest');
    const isMission = this.formResult().every((result) => {
      if (result.status === 'active') {
        return result.mission !== '';
      }
      return true;
    });
    return allFilled && isRest && isMission;
  }

  public sendActivities(): void {
    const activities = this.formResult().map((result) => {
      return result.week.map((day) => {
        return {
          agent: this.currentAgent,
          date: day,
          status: result.status,
          mission: result.mission
        } as UpdateActivity
      })
    });

    const requests = activities.flat();

    for (const request of requests) {
      this.store.updateActivity(request);
    }
  }
}
