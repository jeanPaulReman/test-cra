import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the store to update currentMonth', () => {
    jest.spyOn(component.store, 'changeMonthStore');
    component.changeMonth(1);
    expect(component.store.changeMonthStore).toHaveBeenCalledWith(1);
  });

  it('should call the store to load activities on Init', () => {
    jest.spyOn(component.store, 'loadActivities');

    component.ngOnInit();

    expect(component.store.loadActivities).toHaveBeenCalledWith();
  });

});
