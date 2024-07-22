import { Injectable } from '@angular/core';
import { addDays, subDays } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  public createWeeks(firstOfMonth: Date): Date[][] {
    let weeks: Date[][] = [];
    let dayToAdd = 0;
    let list: Date[] = [];
    for (let i = 0; i < 6; i++) {
      switch (i){
        case 0:
          weeks = [this.createWeek(firstOfMonth.getDay(), firstOfMonth)];
          dayToAdd = 7 - weeks[0].length;
          for (let i = dayToAdd; i > 0 ; i--) {
            list = [...list, subDays(firstOfMonth, i)];
          }
          weeks[0] = [...list, ...weeks[0]];
          break;
        default:
          weeks = [...weeks, this.createWeek(1, addDays(weeks[weeks.length-1][6], 1))];
          break;
      }
    }
    return weeks;
  }

  private createWeek(firstDayOfWeek: number, startWeek: Date): Date[] {
    let week: Date[] = [];
    const diff = firstDayOfWeek !== 0 ? 7 - firstDayOfWeek: 0;
    for (let i = 0; i <= diff; i++) {
      week =[...week, addDays(startWeek, i)]
    }
    return week;
  }
}
