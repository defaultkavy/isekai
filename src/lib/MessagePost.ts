import { Asset, AssetPublicData } from "./Asset.js";
import { BasePost, BasePostClientData, BasePostData, BasePostOptions, BasePostPublicData } from "./BasePost.js";
import { PostManager } from "./PostManager.js";
import { Snowflake } from "./SnowflakeManager.js";

export class MessagePost extends BasePost {
    attachments: Asset[];
    content: string;
    constructor(manager: PostManager, options: MessagePostOptions) {
        super(manager, options)
        this.attachments = options.attachments
        this.content = options.content
    }

    toData(): MessagePostData {
        return {
            ...super.toData(),
            attachments: this.attachments ? this.attachments.map(att => att.id) : undefined,
            content: this.content
        }
    }

    async toPublicData(): Promise<MessagePostPublicData> {
        return {
            ...(await super.toPublicData()),
            attachments: this.attachments.map(att => att.toData()),
            content: this.content
        }
    }

    async toClientData(user: Snowflake): Promise<MessagePostClientData> {
        return {
            ...(await super.toClientData(user)),
            attachments: this.attachments.map(att => att.toData()),
            content: this.content
        }
    }
    
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