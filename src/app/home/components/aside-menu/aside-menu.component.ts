import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLog, Log } from 'src/app/shared/models/log.model';
import { User } from 'src/app/shared/models/user.model';
import { AuthLogsService } from 'src/app/shared/services/auth-logs.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'aside-menu',
    templateUrl: './aside-menu.component.html',
})
export class AsideMenuComponent implements OnInit {

    currentUser: User;

    constructor(
        private router: Router,
        private authLogsService: AuthLogsService,
        private authService: AuthService,
    ) { }

    ngOnInit(): void {
        this.getCurrentUser();
    }

    getCurrentUser(): void {
        this.authService.getCurrentUser()
            .subscribe((user) => {
                this.currentUser = user;
            });
    }

    signOut(): void {
        this.authLogsService.create(new Log(AuthLog.sign_out, this.currentUser?.email)).subscribe();
        this.authService.signOut()
            .subscribe(() => {
                this.router.navigate(['sign-in']);
            })
    }
}
