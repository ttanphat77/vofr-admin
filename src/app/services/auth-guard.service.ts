import { Injectable } from '@angular/core';
import { CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators';
import { NbAccessChecker } from '@nebular/security';

@Injectable()
export class AuthGuard implements CanActivateChild {
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['auth/login']);
          } else {
            this.accessChecker.isGranted('view', this.upperFirstLetter(childRoute.routeConfig.path)).subscribe(res => {
              if(!res) {
                this.router.navigate(['pages']);
              }
            })
          }
        }),
      );
  }

  upperFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  constructor(
    private authService: NbAuthService,
    private router: Router,
    public accessChecker: NbAccessChecker) {
  }

}
