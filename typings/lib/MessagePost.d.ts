import { Asset, AssetPublicData } from "./Asset.js";
import { BasePost, BasePostClientData, BasePostOptions, BasePostPrivateData } from "./BasePost.js";
import { PostManager } from "./PostManager.js";
import { Snowflake } from "./SnowflakeManager.js";
export declare class MessagePost extends BasePost {
    attachments?: Asset[];
    content: string;
    constructor(manager: PostManager, options: MessagePostOptions);
    toData(): MessageData;
    toPublicData(): MessagePostPublicData;
    toPrivateData(): MessagePostPrivateData;
}
export interface MessagePostOptions extends BasePostOptions {
    content: string;
    attachments?: Asset[];
}
export interface MessagePostPrivateData extends MessagePostPublicData, BasePostPrivateData {
}
export interface MessagePostPublicData extends BasePostClientData {
    content: string;
    attachments?: AssetPublicData[];
}
export interface MessageData extends Omit<MessagePostPrivateData, 'attachments'> {
    attachments?: Snowflake[];
}
