import { Asset, AssetPublicData } from "./Asset.js";
import { BasePost, BasePostClientData, BasePostData, BasePostBuilder, BasePostPublicData } from "./BasePost.js";
import { PostManager } from "./PostManager.js";
import { Snowflake } from "./SnowflakeManager.js";

export class MessagePost extends BasePost {
    attachments?: Asset[];
    #attachments: Snowflake[];
    content: string;
    constructor(manager: PostManager, builder: MessagePostBuilder) {
        super(manager, builder)
        this.#attachments = builder.attachments
        this.content = builder.content
    }

    async getAttachments() {
        return this.attachments ?? (this.attachments = await this.client.assets.fetch(this.#attachments))
    }

    toData(): MessagePostData {
        return {
            ...super.toData(),
            attachments: this.#attachments,
            content: this.content
        }
    }

    async toPublicData(): Promise<MessagePostPublicData> {
        return {
            ...(await super.toPublicData()),
            attachments: (await this.getAttachments()).map(att => att.toData()),
            content: this.content
        }
    }

    async toClientData(user: Snowflake): Promise<MessagePostClientData> {
        return {
            ...(await super.toClientData(user)),
            attachments: (await this.getAttachments()).map(att => att.toData()),
            content: this.content
        }
    }
    
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