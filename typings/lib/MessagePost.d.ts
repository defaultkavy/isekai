import { Asset, AssetPublicData } from "./Asset.js";
import { BasePost, BasePostClientData, BasePostData, BasePostBuilder, BasePostPublicData } from "./BasePost.js";
import { PostManager } from "./PostManager.js";
import { Snowflake } from "./SnowflakeManager.js";
export declare class MessagePost extends BasePost {
    #private;
    protected attachments?: Asset[];
    content: string;
    constructor(manager: PostManager, builder: MessagePostBuilder);
    getAttachments(): Promise<Asset[]>;
    toData(): MessagePostData;
    toPublicData(): Promise<MessagePostPublicData>;
    toClientData(user: Snowflake): Promise<MessagePostClientData>;
}
export interface MessagePostBuilder extends BasePostBuilder {
    content: string;
    attachments: Snowflake[];
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
