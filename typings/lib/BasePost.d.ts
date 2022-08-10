import { BaseData, BaseDbObject } from "./BaseDbObject.js";
import { PostManager } from "./PostManager.js";
import { Snowflake } from "./SnowflakeManager.js";
import { User } from "./User.js";
export declare class BasePost extends BaseDbObject {
    id: Snowflake;
    author: User;
    createdTimestamp: number;
    type: PostTypes;
    constructor(manager: PostManager, options: BasePostOptions);
    toData(): BasePostData;
}
export interface BasePostOptions extends Omit<BasePostData, 'author'> {
    id: Snowflake;
    author: User;
}
export interface BasePostData extends BaseData {
    id: Snowflake;
    author: Snowflake;
    type: PostTypes;
}
export declare type PostTypes = 'MESSAGE' | 'ARTICLE';
