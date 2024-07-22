import { Injectable } from '@angular/core';
import { mockUsers } from '../data/mock-user';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated = false;
  private _currentUser: User | null = null;

  public login(name: string, password: string): User | null {
    this._isAuthenticated = password.includes('!')
      ? mockUsers.some((user: User) => user.name === name)
      : false;
    if (this._isAuthenticated) {
      this._currentUser = mockUsers.find((user: User) => user.name === name) ?? null;
    }
    return this._currentUser
      ? { name: this._currentUser.name, role: this._currentUser.role }
      : null;
  }

  public isAuthenticated(): boolean {
    return this._isAuthenticated;
  }
}