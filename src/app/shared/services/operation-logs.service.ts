import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { CrudService } from './crud.service';
import { Log } from '../models/log.model';

@Injectable({
    providedIn: 'root'
})
export class OperationLogsService extends CrudService<Log>{

    collectionName = 'operationLogs'

    constructor(
        public firestore: Firestore,
    ) {
        super(firestore)
    }
}
