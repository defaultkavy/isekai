import { Client } from "../client/Client.js";
import { DbCollection } from "../database/DbCollection.js";
import { BaseManager } from "./BaseManager.js";
import { BasePost, BasePostData } from "./BasePost.js";
import { MessagePost, MessagePostData } from "./MessagePost.js";
import { User } from "./User.js";
export declare class PostManager extends BaseManager<BasePost, BasePostData, BasePostClientData> {
    collection: DbCollection;
    type: string;
    constructor(client: Client);
    createMessagePost(data: MessagePostClientData): Promise<BasePost>;
    fetchByAuthor(author: string | User): Promise<BasePost[]>;
    build(data: BasePostData): Promise<MessagePost>;
}
export interface BasePostClientData extends Omit<BasePostData, 'createdTimestamp'> {
}
export interface MessagePostClientData extends Omit<MessagePostData, 'createdTimestamp'> {
}
