import { Client } from "../client/Client.js";
import { BaseManager } from "./BaseManager.js";
import { Email, User, UserData, Username, UserPrivateData } from "./User.js";
import { DbCollection } from "../database/DbCollection.js";
/**
 * A manager to collect all user in the cache
 */
export declare class UserManager extends BaseManager<User, UserData, UserClientData> {
    collection: DbCollection;
    type: string;
    constructor(parent: Client);
    fetchByUsername(username: Username): Promise<User>;
    fetchByEmail(email: Email): Promise<User>;
    create(data: UserClientData): Promise<User>;
    build(data: UserData): Promise<User>;
}
export interface UserClientData extends Omit<UserPrivateData, 'createdTimestamp'> {
}
