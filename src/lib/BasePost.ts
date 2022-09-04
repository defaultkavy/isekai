import { BaseData, BaseDbObject } from "./BaseDbObject.js";
import { EventTypes } from "./event/Event.js";
import { PostManager } from "./PostManager.js";
import { Snowflake } from "./SnowflakeManager.js";
import { User } from "./User.js";

export class BasePost extends BaseDbObject {
    id: Snowflake;
    author: Snowflake;
    createdTimestamp: number;
    type: PostTypes
    constructor(manager: PostManager, options: BasePostOptions) {
        super(manager);
        this.id = options.id;
        this.author = options.author;
        this.createdTimestamp = options.createdTimestamp;
        this.type = options.type;
    }

    toData(): BasePostData {
        return {
            author: this.author,
            id: this.id,
            createdTimestamp: this.createdTimestamp,
            type: this.type
        }
    }

    async toPublicData(): Promise<BasePostPublicData> {
        return {
            ...this.toData(),
            likes: await this.likes()
        }
    }

    async toClientData(user: Snowflake): Promise<BasePostClientData> {
        return {
            ...(await this.toPublicData()),
            like: !!await this.clientLike(user)
        }
    }

    async likes() {
        return await this.client.db.events.getCount({ post: this.id, activate: true, type: EventTypes.like });
    }

    async likeUsers() {
        return await this.client.db.events.getDataByFilter({ post: this.id, activate: true, type: EventTypes.like }, 50);
    }

    async clientLike(userId: Snowflake) {
        return await this.client.db.events.getDataByFilterOne({ post: this.id, user: userId, type: EventTypes.like, activate: true });
    }
}

export interface BasePostOptions {
    id: Snowflake;
    author: Snowflake;
    createdTimestamp: number;
    type: PostTypes
}

export interface BasePostClientData extends BasePostPublicData {
    like: boolean;
}

export interface BasePostPublicData extends BaseData {
    id: Snowflake;
    author: Snowflake;
    type: PostTypes;
    likes: number;
}

export interface BasePostData extends Omit<BasePostClientData, 'like' | 'likes'> {

}

export declare const enum PostTypes {
    Message,
    Article,
    Gallery
}