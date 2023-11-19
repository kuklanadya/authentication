import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { CrudService } from './crud.service';
import { Log } from '../models/log.model';

@Injectable({
    providedIn: 'root'
})
export class AuthLogsService extends CrudService<Log>{

    collectionName = 'authLogs'

    constructor(
        public firestore: Firestore,
    ) {
        super(firestore)
    }
}
