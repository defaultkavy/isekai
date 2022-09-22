import { Client } from "../client/Client.js";
import { BaseManager } from "./BaseManager.js";
import { Email, User, UserData, Username } from "./User.js";
import { DbCollection } from "../database/DbCollection.js";
import { Snowflake } from "./SnowflakeManager.js";
/**
 * A manager to collect all user in the cache
 */
export declare class UserManager extends BaseManager<User, UserData, UserCreateData> {
    collection: DbCollection<UserData>;
    type: string;
    constructor(parent: Client);
    fetchUsers(ids: Snowflake[]): Promise<User[]>;
    fetchByUsername(username: Username): Promise<User>;
    fetchByEmail(email: Email): Promise<User>;
    create(data: UserCreateData): Promise<User>;
    build(data: UserData): Promise<User>;
}
export interface UserCreateData extends Omit<UserData, 'createdTimestamp'> {
}
