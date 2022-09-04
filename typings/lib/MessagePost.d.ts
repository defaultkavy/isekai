import { Asset, AssetPublicData } from "./Asset.js";
import { BasePost, BasePostClientData, BasePostData, BasePostOptions, BasePostPublicData } from "./BasePost.js";
import { PostManager } from "./PostManager.js";
import { Snowflake } from "./SnowflakeManager.js";
export declare class MessagePost extends BasePost {
    attachments: Asset[];
    content: string;
    constructor(manager: PostManager, options: MessagePostOptions);
    toData(): MessagePostData;
    toPublicData(): Promise<MessagePostPublicData>;
    toClientData(user: Snowflake): Promise<MessagePostClientData>;
}
export interface MessagePostOptions extends BasePostOptions {
    content: string;
    attachments: Asset[];
}
export interface MessagePostClientData extends MessagePostPublicData, BasePostClientData {
}
export interface MessagePostPublicData extends BasePostPublicData {
    content: string;
    attachments: AssetPublicData[];
}
export interface MessagePostData extends BasePostData {
    attachments?: Snowflake[];
    content: string;
}
