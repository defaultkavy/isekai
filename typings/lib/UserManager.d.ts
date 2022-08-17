import { Client } from "../client/Client.js";
import { BaseManager } from "./BaseManager.js";
import { Email, User, Username, UserPrivateData } from "./User.js";
import { DbCollection } from "../database/DbCollection.js";
/**
 * A manager to collect all user in the cache
 */
export declare class UserManager extends BaseManager<User, UserPrivateData, UserClientData> {
    collection: DbCollection;
    type: string;
    constructor(parent: Client);
    fetchByUsername(username: Username): Promise<User>;
    fetchByEmail(email: Email): Promise<User>;
    create(data: UserClientData): Promise<User>;
    build(data: UserPrivateData): Promise<User>;
}
export interface UserClientData extends Omit<UserPrivateData, 'createdTimestamp'> {
}
