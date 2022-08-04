import { Client } from "../client/Client.js";
import { BaseManager } from "./BaseManager.js";
import { Email, User, UserData, Username } from "./User.js";
import { DbCollection } from "../database/DbCollection.js";
import { NotFound } from "../errors/NotFound.js";

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

    async fetchByUsername(username: Username) {
        const data = this.collection.getDataByFilter({username: username})
        if (!data) throw new NotFound(`fetch: ${this.type} not exist.`)
        return await this.cacheSet(data as unknown as UserData)
    }

    async fetchByEmail(email: Email) {
        const data = this.collection.getDataByFilter({email: email})
        if (!data) throw new NotFound(`fetch: ${this.type} not exist.`)
        return await this.cacheSet(data as unknown as UserData)
    }

    async build(data: UserData): Promise<User> {
        return new User(this, {
            id: data.id,
            name: data.name,
            email: data.email
        })
    }
}