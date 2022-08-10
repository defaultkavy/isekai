import { Client } from "../client/Client.js";
import { DbCollection } from "../database/DbCollection.js";
import { HttpException } from "../errors/HttpException.js";
import { BaseManager } from "./BaseManager.js";
import { BasePost, BasePostData } from "./BasePost.js";
import { MessagePost, MessagePostData } from "./MessagePost.js";
import { Snowflake } from "./SnowflakeManager.js";
import { User } from "./User.js";

export class PostManager extends BaseManager<BasePost, BasePostData, BasePostClientData> {
    collection: DbCollection;
    type = 'Post'
    constructor(client: Client) {
        super(client)
        this.collection = client.db.posts
    }

    async createMessagePost(data: MessagePostClientData) {
        Object.assign(data, {type: 'MESSAGE'})
        return await super.__create(data as unknown as MessagePostData)
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

    getPostByUser(user: User | Snowflake) {
        if (user instanceof User) {
            return Array.from(this.cache.values()).filter(post => post.author === user)
        } else {
            return Array.from(this.cache.values()).filter(post => post.author.id === user)
        }
    }
}

export interface BasePostClientData extends Omit<BasePostData, 'createdTimestamp'> {}

export interface MessagePostClientData extends Omit<MessagePostData, 'createdTimestamp' | 'type'> {}