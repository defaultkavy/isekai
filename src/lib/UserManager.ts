import { NotFound } from "../errors/NotFound.js";
import { Client } from "../client/Client.js";
import { BaseManager } from "./BaseManager.js";
import { User, UserData, UserOptions } from "./User.js";
import { DbCollection } from "../Database/DbCollection.js";
import { HttpException } from "../errors/HttpException.js";

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