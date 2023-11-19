import { DbEntity } from "./db-entity.model";

export class Log extends DbEntity {
    action: string;
    user_email?: string;
    constructor(action, user_email) {
        super();
        this.action = action;
        this.user_email = user_email;
    }
}

export enum AuthLog {
    sign_in = 'Sign in attempt',
    sign_out = 'Sign out',
}

export enum OperationLog {
    change_password = 'Change password attempt',
    change_password_restristions = 'Change password restrictions',
    toggle_user_block = 'Toggle user block',
    create_new_user = 'Create new user',
    open_users_list = 'Open users list',
    show_author_info = 'Show author info',
}