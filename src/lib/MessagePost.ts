import { Asset } from "./Asset.js";
import { BasePost, BasePostClientData, BasePostOptions, BasePostPrivateData } from "./BasePost.js";
import { PostManager } from "./PostManager.js";

export class MessagePost extends BasePost {
    attachment?: Asset[];
    content: string;
    constructor(manager: PostManager, options: MessagePostOptions) {
        super(manager, options)
        this.attachment = options.attachment
        this.content = options.content
    }

    toData(): MessagePostPrivateData {
        return {
            ...super.toData(),
            attachment: this.attachment,
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
    attachment?: Asset[];
}

export interface MessagePostPrivateData extends MessagePostClientData, BasePostPrivateData {
}

export interface MessagePostClientData extends BasePostClientData {
    content: string;
    attachment?: Asset[];
}