import { BaseDbObject } from "./BaseDbObject.js";
import { PostManager } from "./PostManager.js";
import { Snowflake } from "./SnowflakeManager.js";
import { User } from "./User.js";

export class BasePost extends BaseDbObject {
    id: Snowflake;
    author: User;
    constructor(manager: PostManager, options: BasePostOptions) {
        super(manager)
        this.id = options.id
        this.author = options.author
    }

    toData(): BasePostData {
        return {
            author: this.author.id,
            id: this.id
        }
    }
}

export interface BasePostOptions {
    id: Snowflake,
    author: User
}

export interface BasePostData {
    id: Snowflake,
    author: Snowflake
}