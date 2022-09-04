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
    toPublicData(): BasePostPublicData;
    toPrivateData(): BasePostPrivateData;
    likes(): Promise<import("mongodb").WithId<import("bson").Document>[] | null>;
    clientLike(userId: Snowflake): Promise<boolean>;
}
export interface BasePostOptions extends Omit<BasePostPrivateData, 'author'> {
    id: Snowflake;
    author: User;
}
export interface BasePostPrivateData extends BasePostPublicData {
}
export interface BasePostPublicData extends BaseData {
    id: Snowflake;
    author: Snowflake;
    type: PostTypes;
}
export interface BasePostData extends BasePostPrivateData {
}
export declare const enum PostTypes {
    Message = 0,
    Article = 1,
    Gallery = 2
}
