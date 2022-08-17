import { BaseData, BaseDbObject } from "./BaseDbObject.js";
import { PostManager } from "./PostManager.js";
import { Snowflake } from "./SnowflakeManager.js";
import { User, UserPublicData } from "./User.js";

export class BasePost extends BaseDbObject {
    id: Snowflake;
    author: User;
    createdTimestamp: number;
    type: PostTypes
    constructor(manager: PostManager, options: BasePostOptions) {
        super(manager)
        this.id = options.id
        this.author = options.author
        this.createdTimestamp = options.createdTimestamp
        this.type = options.type
    }

    toData(): BasePostPrivateData {
        return {
            author: this.author.id,
            id: this.id,
            createdTimestamp: this.createdTimestamp,
            type: this.type
        }
    }

    toClientData(): BasePostClientData {
        return {
            ...this.toData()
        }
    }
}

export interface BasePostOptions extends Omit<BasePostPrivateData, 'author'> {
    id: Snowflake,
    author: User
}

export interface BasePostPrivateData extends BasePostClientData {
}

export interface BasePostClientData extends BaseData {
    id: Snowflake,
    author: Snowflake,
    type: PostTypes
}

export declare const enum PostTypes {
    Message,
    Article
}