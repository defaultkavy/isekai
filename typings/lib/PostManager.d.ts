import { Client } from "../client/Client.js";
import { DbCollection } from "../database/DbCollection.js";
import { BaseManager } from "./BaseManager.js";
import { BasePost, BasePostData } from "./BasePost.js";
import { MessagePost, MessagePostData } from "./MessagePost.js";
import { Snowflake } from "./SnowflakeManager.js";
import { User } from "./User.js";
export declare class PostManager extends BaseManager<BasePost, BasePostData, BasePostCreateData> {
    collection: DbCollection<BasePostData>;
    type: string;
    constructor(client: Client);
    createMessagePost(data: MessagePostCreateData): Promise<BasePost>;
    createReply(data: MessagePostCreateData, parent: Snowflake): Promise<BasePost>;
    fetchByAuthor(author: Snowflake | User, limit?: number, lastId?: Snowflake): Promise<BasePost[]>;
    fetchByLastId(lastId: Snowflake, limit?: number): Promise<BasePost[]>;
    fetchNewest(limit?: number): Promise<BasePost[]>;
    fetchThreads(parent: Snowflake, lastId?: string): Promise<MessagePost[]>;
    fetchLatestThread(parent: Snowflake): Promise<MessagePost | undefined>;
    build(data: BasePostData): MessagePost;
}
export interface BasePostCreateData extends Omit<BasePostData, 'createdTimestamp'> {
}
export interface MessagePostCreateData extends Omit<MessagePostData, 'createdTimestamp' | 'parent'> {
}
