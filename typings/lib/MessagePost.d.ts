import { BasePost, BasePostData, BasePostOptions } from "./BasePost.js";
import { PostManager } from "./PostManager.js";
export declare class MessagePost extends BasePost {
    attachment: null;
    content: string;
    constructor(manager: PostManager, options: MessagePostOptions);
    toData(): MessagePostData;
}
export interface MessagePostOptions extends BasePostOptions {
    content: string;
    attachment: null;
}
export interface MessagePostData extends BasePostData {
    content: string;
    attachment: null;
}
