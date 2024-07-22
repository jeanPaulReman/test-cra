import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';



describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null when login with wrong password', () => {
    const user = service.login('user', 'wrongpassword');
    expect(user).toBeNull();
  });

  it('should return null when login with wrong user', () => {
    const user = service.login('wronguser', 'password');
    expect(user).toBeNull();
  });

  it('should return the user if user and password are ok ', () => {
    const user = service.login('john', '!pass');
    expect(user).toEqual({ name: 'john', role: 'agent' });
  });
});
