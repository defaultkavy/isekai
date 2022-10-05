import { Client } from "../client/Client.js";
import { BaseManager } from "./BaseManager.js";
import { User, UserData, Username } from "./User.js";
import { DbCollection } from "../database/DbCollection.js";
import { Snowflake } from "./SnowflakeManager.js";
/**
 * A manager to collect all user in the cache
 */
export declare class UserManager extends BaseManager<User, UserData, UserCreateData> {
    collection: DbCollection<UserData>;
    type: string;
    constructor(parent: Client);
    fetchUsers(ids: Snowflake[], instance?: true): Promise<User[]>;
    fetchUsers(ids: Snowflake[], instance: false): Promise<UserData[]>;
    fetchByUsername(username: Username, instance?: true): Promise<User>;
    fetchByUsername(username: Username, instance: false): Promise<UserData>;
    fetchByEmail(username: Username, instance?: true): Promise<User>;
    fetchByEmail(username: Username, instance: false): Promise<UserData>;
    create(data: UserCreateData): Promise<User>;
    build(data: UserData): Promise<User>;
}
export interface UserCreateData extends Omit<UserData, 'createdTimestamp'> {
}
