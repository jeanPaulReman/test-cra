import { ActivityService } from '../services/activity.service';
import { mockActivities } from '../data/mock-activities';
import { RoleEnum } from '../enums/role.enum';
import { inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ActivityStore } from '../store/activity.store';

describe('ActivitySore', () => {

  it('should have a loadActivities method', () => {
    TestBed.runInInjectionContext(() => {
      const store = inject(ActivityStore);
      expect(store.loadActivities).toBeDefined();
      expect(store.loadActivities).toBeInstanceOf(Function);
    })
  });

  it('should have a updateActivity method', () => {
    TestBed.runInInjectionContext(() => {
      const store = inject(ActivityStore);
      expect(store.updateActivity).toBeDefined();
      expect(store.updateActivity).toBeInstanceOf(Function);
    })
  });

  it('should have a login method', () => {
    TestBed.runInInjectionContext(() => {
      const store = inject(ActivityStore);
      expect(store.login).toBeDefined();
      expect(store.login).toBeInstanceOf(Function);
    })
  });

  it('should have a logout method', () => {
    TestBed.runInInjectionContext(() => {
      const store = inject(ActivityStore);
      expect(store.logout).toBeDefined();
      expect(store.logout).toBeInstanceOf(Function);
    })
  });

  it('should have a createWeeks method', () => {
    TestBed.runInInjectionContext(() => {
      const store = inject(ActivityStore);
      expect(store.createWeeks).toBeDefined();
      expect(store.createWeeks).toBeInstanceOf(Function);
    })
  });

  it('should have a changeMonthStore method', () => {
    TestBed.runInInjectionContext(() => {
      const store = inject(ActivityStore);
      expect(store.changeMonthStore).toBeDefined();
      expect(store.changeMonthStore).toBeInstanceOf(Function);
    })
  });

  it('should call activityService',  () => {
    TestBed.runInInjectionContext(async () => {
      const spy = jest.spyOn(ActivityService.prototype, 'getActivities')
        .mockImplementationOnce(() => of(mockActivities));
      const store = inject(ActivityStore);

      await store.loadActivities();

      expect(spy).toHaveBeenCalledWith();
      expect(store.activities()).toEqual(mockActivities);
    })
  });

  it('should call activityService to update activities',  () => {
    TestBed.runInInjectionContext(async () => {
      const spy = jest.spyOn(ActivityService.prototype, 'updateActivity')
        .mockImplementationOnce(() => of(mockActivities));
      const store = inject(ActivityStore);

      const update = {
        date: new Date(2021, 3,15),
        agent: 'John',
        status: 'rest'
      }

      await store.updateActivity(update);

      expect(spy).toHaveBeenCalledWith({});
      expect(store.activities()).toEqual(mockActivities);
    })
  });

  it('should call loginService to login and logout ',  () => {
    TestBed.runInInjectionContext(() => {
      const spy = jest.spyOn(AuthService.prototype, 'login')
        .mockImplementationOnce(() => ({ name: 'John', role: RoleEnum.AGENT }));
      const store = inject(ActivityStore);

      store.login('John', 'password');

      expect(spy).toHaveBeenCalledWith('John', 'password');
      expect(store.currentUser()?.name).toEqual('John');
      expect(store.isAuthenticated()).toBeTruthy();

      store.logout();

      expect(store.currentUser()).toBeNull();
      expect(store.isAuthenticated()).toBeFalsy();
    });
  });

});