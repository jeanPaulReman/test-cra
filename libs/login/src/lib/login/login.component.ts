import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivityStore, RoleEnum } from '@test-cra/shared';

@Component({
  selector: 'lib-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public loginForm: FormGroup = new FormGroup({
    name: new FormControl<string | null>( ''),
    password: new FormControl<string | null>(''),
  });

  public readonly store = inject(ActivityStore)
  public readonly router = inject(Router);

  public constructor() {
    effect(() => {
      switch (this.store.currentUser()?.role) {
        case RoleEnum.MANAGER:
          this.router.navigate(['/manager']).finally(null);
          break;
        case RoleEnum.AGENT:
          this.router.navigate(['/agent']).finally(null);
          break;
        default:
          this.router.navigate(['/login']).finally(null);
          break;

      }
    })
  }

  public submitLoginForm(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.store.login(this.loginForm.get('name')?.value, this.loginForm.get('password')?.value);
  }
}
