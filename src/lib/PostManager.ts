import { Client } from "../client/Client.js";
import { DbCollection } from "../database/DbCollection.js";
import { HttpException } from "../errors/HttpException.js";
import { NotFound } from "../errors/NotFound.js";
import { Asset, AssetPublicData } from "./Asset.js";
import { BaseManager } from "./BaseManager.js";
import { BasePost, BasePostPrivateData, PostTypes } from "./BasePost.js";
import { MessageData, MessagePost, MessagePostPrivateData } from "./MessagePost.js";
import { Snowflake } from "./SnowflakeManager.js";
import { User } from "./User.js";

export class PostManager extends BaseManager<BasePost, BasePostPrivateData, BasePostCreateData> {
    collection: DbCollection;
    type = 'Post'
    constructor(client: Client) {
        super(client)
        this.collection = client.db.posts
    }

    async createMessagePost(data: MessagePostCreateData) {
        return await super.__create(data)
    }

    async fetchByAuthor(author: Snowflake | User, lastId?: Snowflake) {
        const userId = this.resolveId(author);
        const data = lastId 
        ? await this.collection.getDataByLastId(lastId, 50, {author: userId}) 
        : await this.collection.getDataByFilter({author: userId}, 50);
        if (!data) throw new NotFound(`fetch: ${this.type} not exist with author`)
        return await this.__cacheSetList(data as unknown as BasePostPrivateData[])
    }

    async fetchByLastId(lastId: Snowflake) {
        const data = await this.collection.getDataByLastId(lastId, 50)
        if (!data) throw new HttpException(`Post fetch failed`)
        return await this.__cacheSetList(data as unknown as BasePostPrivateData[])
    }

    async fetchNewest() {
        const data = await this.collection.getNewestData(50)
        if (!data) throw new HttpException(`Post fetch failed`)
        return await this.__cacheSetList(data as unknown as BasePostPrivateData[])
    }

    async build(data: BasePostPrivateData): Promise<MessagePost> {
        const user = await this.client.users.get(data.author)
        if (data.type === PostTypes.Message) {
            const messageData = data as MessageData
            const attachments: Asset[] = [];
            if (messageData.attachments) for (const att of messageData.attachments) {
                const asset = await this.client.assets.fetch(att);
                attachments.push(asset);
            }
            return new MessagePost(this, {
                ...messageData,
                author: user,
                type: PostTypes.Message,
                attachments: attachments
            })
        }
        throw new HttpException('Post type error')
    }
}

export interface BasePostCreateData extends Omit<BasePostPrivateData, 'createdTimestamp'> {}

export interface MessagePostCreateData extends Omit<MessagePostPrivateData, 'createdTimestamp'> {}