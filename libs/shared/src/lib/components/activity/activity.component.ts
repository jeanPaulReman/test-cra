import { ChangeDetectionStrategy, Component, computed, inject, input, InputSignal } from '@angular/core';
import { NgClass } from '@angular/common';
import { ActivityStore } from '../../store/activity.store';
import { Activity } from '../../interfaces/activity.interface';

@Component({
  selector: 'lib-activity',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityComponent {

  public readonly store = inject(ActivityStore);

  public currentUser = this.store.currentUser;
  public activity: InputSignal<Activity> = input.required();
  public agentActivity = computed(() => {
    return this.activity().value.filter((activity) => activity.agent === this.currentUser()?.name)[0]
  })
}
