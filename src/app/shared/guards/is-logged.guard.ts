import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class IsLoggedGuard {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authService.getCurrentUser()
            .pipe(
                switchMap((user: User) => {
                    if (user?.email && user?.password) {
                        return of(true);
                    }
                    return of(false);
                }),
                tap((isLogged: boolean) => {
                    if (!isLogged) {
                        this.router.navigateByUrl('/sign-in');
                    }
                })
            );
    }
}
