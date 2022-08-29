import { Asset } from "./Asset.js";
import { BasePost, BasePostClientData, BasePostOptions, BasePostPrivateData } from "./BasePost.js";
import { PostManager } from "./PostManager.js";
import { Snowflake } from "./SnowflakeManager.js";
export declare class MessagePost extends BasePost {
    attachments?: Asset[];
    content: string;
    constructor(manager: PostManager, options: MessagePostOptions);
    toData(): MessagePostPrivateData;
    toClientData(): MessagePostClientData;
}
export interface MessagePostOptions extends BasePostOptions {
    content: string;
    attachments?: Asset[];
}
export interface MessagePostPrivateData extends MessagePostClientData, BasePostPrivateData {
}
export interface MessagePostClientData extends BasePostClientData {
    content: string;
    attachments?: Snowflake[];
}
