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

    toData(): BasePostData {
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

export interface BasePostOptions extends Omit<BasePostData, 'author'> {
    id: Snowflake,
    author: User
}

export interface BasePostData extends BaseData {
    id: Snowflake,
    author: Snowflake,
    type: PostTypes
}

export interface BasePostClientData extends Omit<BasePostData, ''> {
}

export enum PostTypes {
    Message,
    Article
}