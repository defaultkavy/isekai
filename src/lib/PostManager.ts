import { Client } from "../client/Client.js";
import { DbCollection } from "../database/DbCollection.js";
import { HttpException } from "../errors/HttpException.js";
import { NotFound } from "../errors/NotFound.js";
import { BaseManager } from "./BaseManager.js";
import { BasePost, BasePostData } from "./BasePost.js";
import { MessagePost, MessagePostData } from "./MessagePost.js";
import { Snowflake } from "./SnowflakeManager.js";
import { User } from "./User.js";

export class PostManager extends BaseManager<BasePost, BasePostData, BasePostCreateData> {
    collection: DbCollection;
    type = 'Post'
    constructor(client: Client) {
        super(client)
        this.collection = client.db.posts
    }

    async createMessagePost(data: MessagePostCreateData) {
        return await super.__create(data)
    }

    async fetchByAuthor(author: string | User) {
        const userId = this.resolveId(author)
        const data = await this.collection.getDataByFilter({author: userId})
        if (!data) throw new NotFound(`fetch: ${this.type} not exist with author`)
        return await this.__cacheSetList(data as unknown as BasePostData[])
    }

    async fetchByLastId(lastId: Snowflake) {
        const data = await this.collection.getDataByLastId(lastId, 50)
        if (!data) throw new HttpException(`Post fetch failed`)
        return await this.__cacheSetList(data as unknown as BasePostData[])
    }

    async fetchNewest() {
        const data = await this.collection.getNewestData(50)
        if (!data) throw new HttpException(`Post fetch failed`)
        return await this.__cacheSetList(data as unknown as BasePostData[])
    }

    async build(data: BasePostData): Promise<MessagePost> {
        const user = await this.client.users.get(data.author)
        if (data.type === 'MESSAGE') {
            const messageData = data as MessagePostData
            return new MessagePost(this, {
                ...messageData,
                author: user,
                type: 'MESSAGE'
            })
        }
        throw new HttpException('Post type error')
    }
}

export interface BasePostCreateData extends Omit<BasePostData, 'createdTimestamp'> {}

export interface MessagePostCreateData extends Omit<MessagePostData, 'createdTimestamp'> {}