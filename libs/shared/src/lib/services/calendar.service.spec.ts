import { TestBed } from '@angular/core/testing';

import { CalendarService } from './calendar.service';

describe('CalendarService', () => {
  let service: CalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return complete weeks', () => {

    const firstOfMonth = new Date('2021-01-01');
    const weeks = service.createWeeks(firstOfMonth);

    expect(weeks.length).toBe(6);
    expect(weeks[0].length).toBe(7);
    expect(weeks[1].length).toBe(7);
    expect(weeks[2].length).toBe(7);
    expect(weeks[3].length).toBe(7);
    expect(weeks[4].length).toBe(7);
    expect(weeks[5].length).toBe(7);
  });
});
