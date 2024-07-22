import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Activity } from '../interfaces/activity.interface';
import { mockActivities } from '../data/mock-activities';
import { UpdateActivity } from '../interfaces/update-activity.interface';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private _activities: Activity[] = mockActivities;

  public getActivities(): Observable<Activity[]> {
    return of(this._activities).pipe(delay(1000));
  }

  public updateActivity(updateActivity: UpdateActivity): Observable<Activity[]> {
    const isDateExist = this._activities.some((activity) => activity.date === updateActivity.date);
    if (!isDateExist) {
      this._activities = [...this._activities, { date: updateActivity.date, value: [
          { agent: updateActivity.agent, status: updateActivity.status, mission: updateActivity.mission }
        ] }];
    } else {
      this._activities = this._activities.map((activity) => {
        activity.value = activity.value.map((el) => (
          {
            ...el,
            ...(
              el.agent === updateActivity.agent && {
                agent: updateActivity.agent,
                status: updateActivity.status,
                mission: updateActivity.mission,
              }),
          }))
        return activity;
      })
    }

    return of(this._activities).pipe(delay(1000));
  }
}
