import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './components/users-list/users-list.component';
import { RouterModule } from '@angular/router';
import { usersRoutes } from './users.routing';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AuthLogsComponent } from './components/auth-logs/auth-logs.component';
import { OperationLogsComponent } from './components/operation-logs/operation-logs.component';
import { TimestampToDatePipe } from '../shared/pipes/tsToDate.pipe';

@NgModule({
  declarations: [
    UsersListComponent,
    AuthLogsComponent,
    OperationLogsComponent,
    TimestampToDatePipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(usersRoutes),
    MatButtonModule,
    MatIconModule,
    DragDropModule,
  ],
  providers: [
    TimestampToDatePipe
  ]
})
export class UsersModule { }
