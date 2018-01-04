import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {
    if (!this.authService.isAuthenticated()) {
      // console.log(3);
      this.router.navigate(['/']);
      return false;
    }
    // console.log(33);
    return true;
  }
}
