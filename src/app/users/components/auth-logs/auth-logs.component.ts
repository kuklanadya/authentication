import { Component, OnInit } from '@angular/core';
import { AuthLogsService } from 'src/app/shared/services/auth-logs.service';

@Component({
  selector: 'auth-logs',
  templateUrl: './auth-logs.component.html',
})
export class AuthLogsComponent implements OnInit {

  logs;

  constructor(
    private authLogsService: AuthLogsService,
  ) { }

  ngOnInit(): void {
    this.getLogs();
  }

  getLogs(): void {
    this.authLogsService.getAll()
      .subscribe(logs => {
        this.logs = logs;
      });
  }
}
