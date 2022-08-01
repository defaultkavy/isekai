import { Client } from "../client/Client.js";
import { BaseManager } from "./BaseManager.js";
import { User, UserData } from "./User.js";
import { DbCollection } from "../Database/DbCollection.js";
/**
 * A manager to collect all user in the cache
 */
export declare class UserManager extends BaseManager<User, UserData> {
    collection: DbCollection;
    type: string;
    constructor(parent: Client);
    build(data: UserData): Promise<User>;
}
