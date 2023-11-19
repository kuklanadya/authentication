import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { CrudService } from './crud.service';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UsersService extends CrudService<User>{

    collectionName = 'users'

    constructor(
        public firestore: Firestore,
    ) {
        super(firestore)
    }
}
