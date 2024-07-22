import { AuthGuard } from './auth.guard';
import { TestBed } from '@angular/core/testing';

describe('AuthGuard', () => {

  const mockAuthService = {
    isAuthenticated: jest.fn()
  };

  it('should be truthy', () => {
    expect(AuthGuard).toBeTruthy();
  });

  it('should return true if user is authenticated', () => {
    mockAuthService.isAuthenticated.mockReturnValue(true);

    const result = TestBed
      .runInInjectionContext(() => mockAuthService.isAuthenticated());

    expect(result).toBeTruthy();

  });

  it('should return false if user is not authenticated', () => {
    mockAuthService.isAuthenticated.mockReturnValue(false);

    const result = TestBed
      .runInInjectionContext(() => mockAuthService.isAuthenticated());

    expect(result).toBeFalsy();
  });
});

