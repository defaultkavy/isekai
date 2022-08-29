import { Asset, AssetPublicData } from "./Asset.js";
import { BasePost, BasePostClientData, BasePostOptions, BasePostPrivateData } from "./BasePost.js";
import { PostManager } from "./PostManager.js";
import { Snowflake } from "./SnowflakeManager.js";

export class MessagePost extends BasePost {
    attachments?: Asset[];
    content: string;
    constructor(manager: PostManager, options: MessagePostOptions) {
        super(manager, options)
        this.attachments = options.attachments
        this.content = options.content
    }

    toData(): MessagePostPrivateData {
        return {
            ...super.toData(),
            attachments: this.attachments ? this.attachments.map(att => att.id) : undefined,
            content: this.content
        }
    }

    toClientData(): MessagePostClientData {
        return {
            ...this.toData(),
        }
    }
    
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