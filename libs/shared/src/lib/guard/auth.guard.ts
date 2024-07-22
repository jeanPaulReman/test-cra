import { inject } from "@angular/core";
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (
  route,
  state,
  router = inject(Router),
  auth = inject(AuthService)
) => {


  if(!auth.isAuthenticated()) {
    router.navigateByUrl('/login').catch(console.error)
    return false
  }
  return true
}