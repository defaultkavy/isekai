import { Client } from "../client/Client.js";
import { DbCollection } from "../database/DbCollection.js";
import { HttpException } from "../errors/HttpException.js";
import { NotFound } from "../errors/NotFound.js";
import { Asset } from "./Asset.js";
import { BaseManager } from "./BaseManager.js";
import { BasePost, BasePostData, PostTypes } from "./BasePost.js";
import { MessagePost, MessagePostData } from "./MessagePost.js";
import { Snowflake } from "./SnowflakeManager.js";
import { User } from "./User.js";

export class PostManager extends BaseManager<BasePost, BasePostData, BasePostCreateData> {
    collection: DbCollection<BasePostData>;
    type = 'Post'
    constructor(client: Client) {
        super(client)
        this.collection = client.db.posts
    }

    async createMessagePost(data: MessagePostCreateData) {
        return await super.__create({...data, parent: undefined});
    }

    async createReply(data: MessagePostCreateData, parent: Snowflake) {
        return await this.__create({...data, parent});
    }

    async fetchByAuthor(author: Snowflake | User, limit = 20, lastId?: Snowflake) {
        const userId = this.resolveId(author);
        const data = lastId 
        ? await this.collection.getDataByLastId(lastId, 20, {author: userId, parent: undefined}) 
        : await this.collection.getDataByFilter({author: userId, parent: undefined}, limit, true);
        if (!data) throw new NotFound(`fetch: ${this.type} not exist with author`)
        return await this.__cacheSetList(data)
    }

    async fetchByLastId(lastId: Snowflake, limit = 20) {
        const data = await this.collection.getDataByLastId(lastId, limit, {parent: undefined})
        if (!data) throw new HttpException(`Post fetch failed`)
        return await this.__cacheSetList(data)
    }

    async fetchNewest(limit = 20) {
        const data = await this.collection.getNewestData(limit, {parent: undefined})
        if (!data) throw new HttpException(`Post fetch failed`)
        return await this.__cacheSetList(data)
    }

    async fetchThreads(parent: Snowflake, lastId?: string): Promise<MessagePost[]> {
        let postsData: BasePostData[] = [];
        if (lastId) postsData = await this.client.db.posts.getDataByLastId(lastId, 50, { parent: parent });
        else postsData = await this.client.db.posts.getNewestData(50, { parent: parent });
        return await this.client.posts.__cacheSetList(postsData) as MessagePost[];
    }

    async fetchLatestThread(parent: Snowflake): Promise<MessagePost | undefined> {
        const postsData = await this.client.db.posts.getDataByFilter({parent: parent}, 1, true);
        if (!postsData) return undefined;
        return await this.__cacheSet(postsData[0]) as MessagePost;
    }

    async build(data: BasePostData): Promise<MessagePost> {
        if (data.type === PostTypes.Message) {
            const messageData = data as MessagePostData
            const attachments: Promise<Asset>[] = [];
            if (messageData.attachments) for (const att of messageData.attachments) {
                const asset = this.client.assets.fetch(att);
                attachments.push(asset);
            }
            return new MessagePost(this, {
                ...messageData,
                type: PostTypes.Message,
                attachments: await Promise.all(attachments)
            })
        }
        throw new HttpException('Post type error')
    }
}

export interface BasePostCreateData extends Omit<BasePostData, 'createdTimestamp'> {}

export interface MessagePostCreateData extends Omit<MessagePostData, 'createdTimestamp' | 'attachments' | 'parent'> {
    attachments: Asset[];
}