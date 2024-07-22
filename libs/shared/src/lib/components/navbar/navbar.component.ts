import { Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { ActivityStore } from '../../store/activity.store';
import { RoleEnum } from '../../enums/role.enum';

@Component({
  selector: 'lib-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public store = inject(ActivityStore);
  public role: RoleEnum | null = null;
  public roleEnum = RoleEnum;
  public constructor() {
    effect(() => {
      this.role = this.store.currentUser()?.role ?? null;
    })
  }

  public logout() {
    this.store.logout();
  }


}
