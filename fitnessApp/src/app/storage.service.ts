import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(token: string): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, token);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public getTokenValue(): any {
    const token = window.sessionStorage.getItem(USER_KEY);
    if(token) {
      return token;
    }

    return null;
    
  }
  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
}
