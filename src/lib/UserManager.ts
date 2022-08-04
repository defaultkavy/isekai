import { Client } from "../client/Client.js";
import { BaseManager } from "./BaseManager.js";
import { Email, User, UserData, Username } from "./User.js";
import { DbCollection } from "../database/DbCollection.js";
import { NotFound } from "../errors/NotFound.js";
import { Conflict } from "../errors/Conflict.js";

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
        const data = await this.collection.getDataByFilter({username: username})
        if (!data) throw new NotFound(`fetch: ${this.type} not exist with username`)
        return await this.cacheSet(data as unknown as UserData)
    }

    async fetchByEmail(email: Email) {
        const data = await this.collection.getDataByFilter({email: email})
        if (!data) throw new NotFound(`fetch: ${this.type} not exist with email`)
        return await this.cacheSet(data as unknown as UserData)
    }

    async registerCheck(email: Email, username: Username) {
        return !(await this.collection.checkDuplicateByFilter({
            username: username
        })) 
        || !(await this.collection.checkDuplicateByFilter({
            email: email
        }))
    }

    async create(data: UserData) {
        if (await this.collection.checkDuplicateByFilter({ username: data.username }))
            throw new Conflict('create: username duplicated')
        if (await this.collection.checkDuplicateByFilter({ email: data.email }))
            throw new Conflict('create: email duplicated')
        return super.create(data)
    }

    async build(data: UserData): Promise<User> {
        return new User(this, {
            id: data.id,
            username: data.username,
            email: data.email,
            displayName: data.displayName
        })
    }
}