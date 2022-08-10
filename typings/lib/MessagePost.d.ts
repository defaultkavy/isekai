import { BasePost, BasePostData, BasePostOptions } from "./BasePost.js";
import { PostManager } from "./PostManager.js";
export declare class MessagePost extends BasePost {
    constructor(manager: PostManager, options: MessagePostOptions);
}
export interface MessagePostOptions extends BasePostOptions {
    content: string;
    attachment: null;
}
export interface MessagePostData extends BasePostData {
    content: string;
    attachment: null;
}
