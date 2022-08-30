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

    toData(): MessageData {
        return {
            ...super.toData(),
            attachments: this.attachments ? this.attachments.map(att => att.id) : undefined,
            content: this.content
        }
    }

    toPublicData(): MessagePostPublicData {
        return {
            ...super.toData(),
            attachments: this.attachments ? this.attachments.map(att => att.toData()) : undefined,
            content: this.content
        }
    }

    toPrivateData(): MessagePostPrivateData {
        return {
            ...this.toPublicData(),
        }
    }
    
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