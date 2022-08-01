import { BaseDbObject } from "./BaseDbObject.js";
import { PostManager } from "./PostManager.js";
import { Snowflake } from "./SnowflakeManager.js";
import { User } from "./User.js";
export declare class BasePost extends BaseDbObject {
    id: Snowflake;
    author: User;
    constructor(manager: PostManager, options: BasePostOptions);
    toData(): BasePostData;
}
export interface BasePostOptions {
    id: Snowflake;
    author: User;
}
export interface BasePostData {
    id: Snowflake;
    author: Snowflake;
}
