import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }
  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.auth.isLoggedIn()) {
      const userRole = this.auth.userRole;
      console.log(route.data.role);
      if (route.data.role !== userRole) {
        this.router.navigate(['/registration']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/registration']);
    return false;
  }
}
