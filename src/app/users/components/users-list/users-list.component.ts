import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { combineLatest, distinctUntilChanged, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OperationLogsService } from 'src/app/shared/services/operation-logs.service';
import { Log, OperationLog } from 'src/app/shared/models/log.model';

@Component({
    selector: 'users-list',
    templateUrl: './users-list.component.html',
})
export class UsersListComponent implements OnInit {

    users;
    currentUser: User;

    constructor(
        private cdr: ChangeDetectorRef,
        private operationLogsService: OperationLogsService,
        private authService: AuthService,
        private usersService: UsersService
    ) { }

    ngOnInit(): void {
        this.getContentData();
    }

    getContentData(): void {
        combineLatest([
            this.authService.getCurrentUser(),
            this.usersService.getAll(),
        ]).subscribe(([currentUser, users]) => {
            this.currentUser = currentUser;
            this.users = users;
            this.cdr.detectChanges();
            this.operationLogsService.create(new Log(OperationLog.open_users_list, this.currentUser.email));
        });
    }

    changeOption(user: User, field: string, value: boolean): void {
        if (field === 'is_blocked') {
            this.operationLogsService.create(new Log(OperationLog.toggle_user_block, this.currentUser?.email));
        } else if (field === 'password_restricted') {
            this.operationLogsService.create(new Log(OperationLog.change_password_restristions, this.currentUser?.email));
        }
        user[field] = value;
        this.usersService.update(user, user.id).subscribe();
    }

    blockAll(): void {
        this.operationLogsService.create(new Log(OperationLog.toggle_user_block, this.currentUser?.email));
        const users = this.users.filter(user => user.name !== 'ADMIN');
        const users$ = users.map(user => this.usersService.update({ ...user, is_blocked: true }, user.id));
        combineLatest(users$).subscribe();
    }

    restrictAll(): void {
        this.operationLogsService.create(new Log(OperationLog.change_password_restristions, this.currentUser?.email));
        const users = this.users.filter(user => user.name !== 'ADMIN');
        const users$ = users.map(user => this.usersService.update({ ...user, password_restricted: true }, user.id));
        combineLatest(users$).subscribe();
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.users, event.previousIndex, event.currentIndex);
    }

    generateNewUser(): void {
        this.operationLogsService.create(new Log(OperationLog.create_new_user, this.currentUser?.email));
        const name = this.generateUniqueUsername();
        const email = `${name}@gmail.com`;
        const password = this.authService.encryptPassword('user1111');
        this.authService.registerNewUser(email, password)
            .pipe(
                switchMap(() => this.usersService.create({
                    name,
                    email,
                    password,
                }))
            ).subscribe((createdUser) => { })
    }

    generateUniqueUsername() {
        const allowedCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        const usernameLength = 8;
        let username = '';

        for (let i = 0; i < usernameLength; i++) {
            const randomIndex = Math.floor(Math.random() * allowedCharacters.length);
            username += allowedCharacters.charAt(randomIndex);
        }
        return username;
    }
}
