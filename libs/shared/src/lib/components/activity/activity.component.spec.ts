import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityComponent } from './activity.component';
import { signal } from '@angular/core';
import { RoleEnum } from '../../enums/role.enum';

describe('ActivityComponent', () => {
  let component: ActivityComponent;
  let fixture: ComponentFixture<ActivityComponent>;
  

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ActivityComponent]
    });

    fixture = TestBed.createComponent(ActivityComponent);
    component = fixture.componentInstance;
    component.currentUser = signal({ name: 'agent', role: RoleEnum.AGENT });
    fixture.componentRef.setInput('activity', { date: '2021-01-01', value: [
      { agent: 'agent', status: 'status', mission: 'mission' }]
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
