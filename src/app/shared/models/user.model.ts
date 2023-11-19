import { DbEntity } from "./db-entity.model";

export class User extends DbEntity {
    id?: string;
    email!: string;
    name?: string;
    password!: string;
    is_blocked?: boolean;
    password_restricted?: boolean;
    constructor() {
        super();
    }
}