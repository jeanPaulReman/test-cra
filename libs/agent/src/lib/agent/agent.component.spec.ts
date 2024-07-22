import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgentComponent } from './agent.component';
import { ActivityStore } from '@test-cra/shared';

describe('AgentComponent', () => {
  let component: AgentComponent;
  let fixture: ComponentFixture<AgentComponent>;
  let store;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AgentComponent],
    });

    fixture = TestBed.createComponent(AgentComponent);
    store = TestBed.inject(ActivityStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
