import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarWeekComponent } from './calendar-week.component';

describe('CalendarWeekComponent', () => {
  let component: CalendarWeekComponent;
  let fixture: ComponentFixture<CalendarWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarWeekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarWeekComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('currentMonth', 0);
    fixture.componentRef.setInput('week', [new Date('2022-01-01')]);
    fixture.componentRef.setInput('activities', []);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true if day is from another month', () => {
    fixture.componentRef.setInput('currentMonth', 0);

    const result = component.isOtherMonth(new Date('2022-02-01'));
    expect(result).toBeTruthy();
  });

  it('should return false if day is from same month', () => {
    fixture.componentRef.setInput('currentMonth', 0);

    const result = component.isOtherMonth(new Date('2022-01-01'));
    expect(result).toBeFalsy();
  });

});
