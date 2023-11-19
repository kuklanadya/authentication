import { Component, OnInit } from '@angular/core';
import { OperationLogsService } from 'src/app/shared/services/operation-logs.service';

@Component({
  selector: 'operation-logs',
  templateUrl: './operation-logs.component.html',
})
export class OperationLogsComponent implements OnInit {

  logs;

  constructor(
    private operationLogsService: OperationLogsService,
  ) { }

  ngOnInit(): void {
    this.getLogs();
  }

  getLogs(): void {
    this.operationLogsService.getAll()
      .subscribe(logs => {
        this.logs = logs;
      });
  }
}
