import { Client } from "../client/Client.js";
import { BaseManager } from "./BaseManager.js";
import { User, UserData } from "./User.js";
import { DbCollection } from "../database/DbCollection.js";

/**
 * A manager to collect all user in the cache
 */
export class UserManager extends BaseManager<User, UserData> {
    collection: DbCollection;
    type = 'User'
    constructor(parent: Client) {
        super(parent)
        this.collection = this.client.db.users
    }

    async build(data: UserData): Promise<User> {
        return new User(this, {
            id: data.id,
            name: data.name
        })
    }
}