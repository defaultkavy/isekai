import { BaseData, BaseDbObject } from "./BaseDbObject.js";
import { LikeEvent } from "./event/LikeEvent.js";
import { PostManager } from "./PostManager.js";
import { Snowflake } from "./SnowflakeManager.js";
export declare class BasePost extends BaseDbObject {
    id: Snowflake;
    author: Snowflake;
    createdTimestamp: number;
    type: PostTypes;
    parent: Snowflake | undefined;
    constructor(manager: PostManager, options: BasePostOptions);
    toData(): BasePostData;
    toPublicData(): Promise<BasePostPublicData>;
    toClientData(user: Snowflake): Promise<BasePostClientData>;
    threads(lastId?: Snowflake): Promise<BasePost[]>;
    likes(): Promise<number>;
    likeUsers(): Promise<import("./event/Event.js").EventData[] | null>;
    clientLike(userId: Snowflake): Promise<LikeEvent | undefined>;
}
export interface BasePostOptions {
    id: Snowflake;
    author: Snowflake;
    createdTimestamp: number;
    type: PostTypes;
    parent: Snowflake | undefined;
}
export interface BasePostClientData extends BasePostPublicData {
    like: boolean;
}
export interface BasePostPublicData extends BaseData {
    id: Snowflake;
    author: Snowflake;
    type: PostTypes;
    likes: number;
    parent: Snowflake | undefined;
}
export interface BasePostData extends Omit<BasePostClientData, 'like' | 'likes'> {
}
export declare const enum PostTypes {
    Message = 0,
    Article = 1,
    Gallery = 2
}
