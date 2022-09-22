import { Client } from "../client/Client.js";
import { BaseManager } from "./BaseManager.js";
import { Email, User, UserBuilder, UserData, Username, UserPrivateData } from "./User.js";
import { DbCollection } from "../database/DbCollection.js";
import { NotFound } from "../errors/NotFound.js";
import { Conflict } from "../errors/Conflict.js";
import { Snowflake } from "./SnowflakeManager.js";

/**
 * A manager to collect all user in the cache
 */
export class UserManager extends BaseManager<User, UserData, UserCreateData> {
    collection: DbCollection<UserData>;
    type = 'User'
    constructor(parent: Client) {
        super(parent)
        this.collection = this.client.db.users
    }

    async fetchUsers(ids: Snowflake[]) {
        const data = await this.collection.getDataByFilter({
            id: {
                $in: ids
            }
        });
        if (!data) throw new NotFound(`fetch: ${this.type} not exist with id`);
        return await this.__cacheSetList(data);
    }

    async fetchByUsername(username: Username) {
        const data = await this.collection.getDataByFilterOne({username: username})
        if (!data) throw new NotFound(`fetch: ${this.type} not exist with username`)
        return await this.__cacheSet(data)
    }

    async fetchByEmail(email: Email) {
        const data = await this.collection.getDataByFilterOne({email: email})
        if (!data) throw new NotFound(`fetch: ${this.type} not exist with email`)
        return await this.__cacheSet(data)
    }

    async create(data: UserCreateData) {
        if (await this.collection.checkDuplicateByFilter({ username: data.username }))
            throw new Conflict('create: username duplicated')
        if (await this.collection.checkDuplicateByFilter({ email: data.email }))
            throw new Conflict('create: email duplicated')
        return super.__create(data)
    }

    async build(data: UserData): Promise<User> {
        const builder: UserBuilder = {
            ...data,
            avatar: data.avatar ? await this.client.assets.fetch(data.avatar).catch(err => undefined) : undefined,
            cover: data.cover ? await this.client.assets.fetch(data.cover).catch(err => undefined) : undefined,
        }
        return new User(this, builder);
    }
}

export interface UserCreateData extends Omit<UserData, 'createdTimestamp'> {}