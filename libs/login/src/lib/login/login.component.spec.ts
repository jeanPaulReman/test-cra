import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ActivityStore } from '@test-cra/shared';
import { SignalStoreProps } from '@ngrx/signals/src/signal-store-models';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: SignalStoreProps<any>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [LoginComponent],
    });

    fixture = TestBed.createComponent(LoginComponent);
    store = TestBed.inject(ActivityStore);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call store for login', () => {
    const spy = jest.spyOn(store, 'login');

    component.loginForm.get('name')?.setValue('name');
    component.loginForm.get('password')?.setValue('pass');

    component.submitLoginForm();

    expect(spy).toHaveBeenCalledWith('name', 'pass');
  });
});
