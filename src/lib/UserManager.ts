import { Client } from "../client/Client.js";
import { BaseClientData, BaseManager } from "./BaseManager.js";
import { Email, User, UserData, Username } from "./User.js";
import { DbCollection } from "../database/DbCollection.js";
import { NotFound } from "../errors/NotFound.js";
import { Conflict } from "../errors/Conflict.js";

/**
 * A manager to collect all user in the cache
 */
export class UserManager extends BaseManager<User, UserData, UserClientData> {
    collection: DbCollection;
    type = 'User'
    constructor(parent: Client) {
        super(parent)
        this.collection = this.client.db.users
    }

    async fetchByUsername(username: Username) {
        const data = await this.collection.getDataByFilterOne({username: username})
        if (!data) throw new NotFound(`fetch: ${this.type} not exist with username`)
        return await this.__cacheSet(data as unknown as UserData)
    }

    async fetchByEmail(email: Email) {
        const data = await this.collection.getDataByFilterOne({email: email})
        if (!data) throw new NotFound(`fetch: ${this.type} not exist with email`)
        return await this.__cacheSet(data as unknown as UserData)
    }

    async create(data: UserClientData) {
        if (await this.collection.checkDuplicateByFilter({ username: data.username }))
            throw new Conflict('create: username duplicated')
        if (await this.collection.checkDuplicateByFilter({ email: data.email }))
            throw new Conflict('create: email duplicated')
        return super.__create(data)
    }

    async build(data: UserData): Promise<User> {
        return new User(this, data)
    }
}

export interface UserClientData extends Omit<UserData, 'createdTimestamp'> {}