import { Client } from "../client/Client.js";
import { DbCollection } from "../database/DbCollection.js";
import { BaseManager } from "./BaseManager.js";
import { BasePost, BasePostPrivateData } from "./BasePost.js";
import { MessagePost, MessagePostPrivateData } from "./MessagePost.js";
import { Snowflake } from "./SnowflakeManager.js";
import { User } from "./User.js";
export declare class PostManager extends BaseManager<BasePost, BasePostPrivateData, BasePostCreateData> {
    collection: DbCollection;
    type: string;
    constructor(client: Client);
    createMessagePost(data: MessagePostCreateData): Promise<BasePost>;
    fetchByAuthor(author: string | User): Promise<BasePost[]>;
    fetchByLastId(lastId: Snowflake): Promise<BasePost[]>;
    fetchNewest(): Promise<BasePost[]>;
    build(data: BasePostPrivateData): Promise<MessagePost>;
}
export interface BasePostCreateData extends Omit<BasePostPrivateData, 'createdTimestamp'> {
}
export interface MessagePostCreateData extends Omit<MessagePostPrivateData, 'createdTimestamp'> {
}
