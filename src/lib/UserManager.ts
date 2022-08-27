import { Client } from "../client/Client.js";
import { BaseManager } from "./BaseManager.js";
import { Email, User, UserBuilder, Username, UserPrivateData } from "./User.js";
import { DbCollection } from "../database/DbCollection.js";
import { NotFound } from "../errors/NotFound.js";
import { Conflict } from "../errors/Conflict.js";

/**
 * A manager to collect all user in the cache
 */
export class UserManager extends BaseManager<User, UserPrivateData, UserClientData> {
    collection: DbCollection;
    type = 'User'
    constructor(parent: Client) {
        super(parent)
        this.collection = this.client.db.users
    }

    async fetchByUsername(username: Username) {
        const data = await this.collection.getDataByFilterOne({username: username})
        if (!data) throw new NotFound(`fetch: ${this.type} not exist with username`)
        return await this.__cacheSet(data as unknown as UserPrivateData)
    }

    async fetchByEmail(email: Email) {
        const data = await this.collection.getDataByFilterOne({email: email})
        if (!data) throw new NotFound(`fetch: ${this.type} not exist with email`)
        return await this.__cacheSet(data as unknown as UserPrivateData)
    }

    async create(data: UserClientData) {
        if (await this.collection.checkDuplicateByFilter({ username: data.username }))
            throw new Conflict('create: username duplicated')
        if (await this.collection.checkDuplicateByFilter({ email: data.email }))
            throw new Conflict('create: email duplicated')
        return super.__create(data)
    }

    async build(data: UserPrivateData): Promise<User> {
        const builder: UserBuilder = {
            ...data,
            avatar: data.avatar ? await this.client.assets.fetch(data.avatar.id) : undefined,
            cover: data.cover ? await this.client.assets.fetch(data.cover.id) : undefined,
        }
        return new User(this, builder);
    }
}

export interface UserClientData extends Omit<UserPrivateData, 'createdTimestamp'> {}