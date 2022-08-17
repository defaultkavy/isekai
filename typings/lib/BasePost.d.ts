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
    toData(): BasePostPrivateData;
    toClientData(): BasePostClientData;
}
export interface BasePostOptions extends Omit<BasePostPrivateData, 'author'> {
    id: Snowflake;
    author: User;
}
export interface BasePostPrivateData extends BasePostClientData {
}
export interface BasePostClientData extends BaseData {
    id: Snowflake;
    author: Snowflake;
    type: PostTypes;
}
export declare const enum PostTypes {
    Message = 0,
    Article = 1
}
