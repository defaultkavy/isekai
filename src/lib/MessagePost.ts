import { BasePost, BasePostData, BasePostOptions } from "./BasePost.js";
import { PostManager } from "./PostManager.js";

export class MessagePost extends BasePost {
    constructor(manager: PostManager, options: MessagePostOptions) {
        super(manager, options)
    }
    
}

export interface MessagePostOptions extends BasePostOptions {
    content: string;
    attachment: null;
}

export interface MessagePostData extends BasePostData {
    content: string;
    attachment: null;
}