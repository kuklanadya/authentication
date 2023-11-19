import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UsersService } from './users.service';
import { Observable, catchError, from, map, of, switchMap, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private _user: User;

    constructor(
        public auth: AngularFireAuth,
        private usersService: UsersService,
    ) { }

    get user$(): User {
        return this._user;
    }

    set user(value) {
        this._user = value;
    }

    signUp(email: string, password: string): Observable<any> {
        const hashedPassword = this.encryptPassword(password);
        return from(
            this.auth.createUserWithEmailAndPassword(email, hashedPassword)
        ).pipe(
            switchMap(() => {
                return this.usersService.create({ email, password: hashedPassword });
            }),
        )

    }

    signIn(email: string, password: string): Observable<User | User[]> {
        const hashedPassword = this.encryptPassword(password);
        return from(this.auth.signInWithEmailAndPassword(email, hashedPassword))
            .pipe(
                catchError((error) => {
                    return this.usersService.getByField('email', email).pipe(
                        switchMap((user: any) => {
                            if (!user || user.length === 0) {
                                window.alert('Invalid login - this account hasn`t been registered yet');
                                return throwError(() => 'Invalid login');
                            } else {
                                window.alert('Invalid password. Please, try again');
                                return throwError(() => ('Invalid password'));
                            }
                        })
                    );
                }),
                switchMap(() => this.usersService.getByTwoFields('email', email, 'password', hashedPassword))
            );
    }

    signOut(): Observable<void> {
        return from(this.auth.signOut());
    }

    registerNewUser(email: string, password: string): Observable<any> {
        return from(
            this.auth.createUserWithEmailAndPassword(email, password)
        )
    }

    encryptPassword(password: string): string {
        const a = 1;
        const expValue = Math.exp(-a * password.length);
        const hashedPassword = String(expValue);
        return hashedPassword;
    }

    getCurrentUser(): Observable<any> {
        return this.auth.user
            .pipe(
                switchMap((user) => this.usersService.getByField('email', user?.email)),
                map(users => users[0]),
                catchError(() => of([])),
                tap(user => this.user = user),
            );
    }

    changePassword(currentUser: User, newPassword: string): Observable<{ success: boolean; message: string }> {
        const hashedPassword = this.encryptPassword(newPassword);
        return from(this.auth.signInWithEmailAndPassword(currentUser.email, currentUser.password))
            .pipe(
                switchMap(() => this.auth.user),
                switchMap((user) => {
                    if (user) {
                        return from(user.updatePassword(hashedPassword))
                            .pipe(
                                switchMap(() => this.usersService.update({ ...currentUser, password: hashedPassword }, currentUser.id)
                                    .pipe(
                                        map(() => ({ success: true, message: 'Password updated successfully' }))
                                    )),
                                catchError((error) => of({ success: false, message: error.message }))
                            );
                    } else {
                        return of({ success: false, message: 'No user is currently authenticated.' });
                    }
                })
            );
    }
}

