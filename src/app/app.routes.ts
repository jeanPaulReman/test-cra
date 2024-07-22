import { Route } from '@angular/router';
import { AuthGuard } from '@test-cra/shared';
import { LoginComponent } from '@test-cra/login';
export const appRoutes: Route[] = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'manager',
    canActivate: [AuthGuard],
    loadComponent: () => import('@test-cra/manager').then((c) => c.ManagerComponent),
  },
  {
    path: 'agent',
    canActivate: [AuthGuard],
    loadComponent: () => import('@test-cra/agent').then((c) => c.AgentComponent),
  },
];
