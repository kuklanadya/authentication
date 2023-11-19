import { Component, OnInit } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { Log, OperationLog } from 'src/app/shared/models/log.model';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OperationLogsService } from 'src/app/shared/services/operation-logs.service';

@Component({
  selector: 'author-info',
  templateUrl: './author-info.component.html',
})
export class AuthorInfoComponent implements OnInit {

  isShowed: boolean = false;
  currentUser: User;

  constructor(
    private authService: AuthService,
    private operationLogsService: OperationLogsService,
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.authService.getCurrentUser()
      .pipe(
        switchMap((user) => {
          this.operationLogsService.create(new Log(OperationLog.open_users_list, user.email));
          return of(user);
        })
      ).subscribe(user => {
        this.currentUser = user;
      })
  }

  toggleDescription(): void {
    this.isShowed = !this.isShowed;
  }

}
