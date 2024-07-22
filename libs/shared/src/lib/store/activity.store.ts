import { Activity } from '../interfaces/activity.interface';
import { ActivityService } from '../services/activity.service';
import { UpdateActivity } from '../interfaces/update-activity.interface';
import { User } from '../interfaces/user.interface';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CalendarService } from '../services/calendar.service';
import { addMonths } from 'date-fns';

/*
Calendar Constants
 */
const today = new Date();
const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];


type ActivityState = {
  activities: Activity[]
  requestState: 'none' | 'loading' | 'success' | 'error';
  currentUser: User | null;
  filterUser: string[];
  filterStatus: string[];
  weeks: Date[][];
  currentMonthLabel: string;
  indexMonth: number;
  firstOfMonth: Date;
  year: number;
};


const initialState: ActivityState = {
  activities: [],
  requestState: 'none',
  currentUser: null,
  filterUser: [],
  filterStatus: [],
  weeks: [],
  currentMonthLabel: months[today.getMonth()],
  indexMonth: months.indexOf(months[today.getMonth()]),
  firstOfMonth: new Date(today.getFullYear(), today.getMonth(), 1),
  year: today.getFullYear()
};

export const ActivityStore = signalStore(
  { providedIn: 'root'},
  withState(initialState),
  withMethods(
    (store,
     activityService = inject(ActivityService),
     calendarService = inject(CalendarService),
     loginService = inject(AuthService)) => ({
      async loadActivities() {
        patchState(store, { requestState: 'loading' });

        try {
          const activities = await firstValueFrom(activityService.getActivities());
          patchState(store, { activities, requestState: 'success' });
        } catch (error) {
          patchState(store, { activities: store.activities(), requestState: 'error' });
        }
      },

      async updateActivity(updateActivity: UpdateActivity) {
        patchState(store, { requestState: 'loading' });

        try {
          const activities = await firstValueFrom(activityService.updateActivity(updateActivity));
          patchState(store, { activities, requestState: 'success' });
        } catch (error) {
          patchState(store, { requestState: 'error' });
        }
      },

      login(name: string, password: string) {
        const currentUser = loginService.login(name, password);
        patchState(store, () => ({
          currentUser
        }))

      },

      logout() {
        patchState(store, () => ({
          currentUser: null
        }))

      },
      createWeeks() {
        const firstOfMonth = store.firstOfMonth();
        const weeks = calendarService.createWeeks(firstOfMonth);
        patchState(store, () => ({ weeks }));
      },

      changeMonthStore(value: number) {
        const month = months.indexOf(store.currentMonthLabel());
        const currentMonthLabel = months[month + value];
        const indexMonth = months.indexOf(currentMonthLabel);
        const firstOfMonth = addMonths(store.firstOfMonth(), value);
        const year = store.firstOfMonth().getFullYear()
        const weeks = calendarService.createWeeks(firstOfMonth);
        patchState(store, () => ({ currentMonthLabel, indexMonth, firstOfMonth, weeks, year }));
      },

    })
  ),
  withComputed((state) => ({
    filterUser: computed(() => {

      const activities = state.activities();
      if (state.filterUser.length === 0) {
        return activities;
      }
      return activities.filter((activity) => {
        return activity.value.some((el) => state.filterUser().includes(el.agent))
      })
    }),

    filterStatus: computed(() => {
      const activities = state.activities();
      if (state.filterStatus.length === 0) {
        return activities;
      }
      return activities.filter((activity: Activity) => {
        return activity.value.some((el) => state.filterStatus().includes(el.status))
      })
    }),

    isAuthenticated: computed(() => {
      return state.currentUser() !== null
    }),

    currentMonthWeek: computed(() => {
      const weeks = state.weeks().filter((week) => week.some((day) => day.getMonth() === state.indexMonth()));
      return  weeks.map((week) => ({
        week: week,
        status: '',
        mission: ''
      }));
    }),

  }))
);
