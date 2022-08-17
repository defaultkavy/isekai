import { BasePost, BasePostOptions, BasePostPrivateData } from "./BasePost.js";
import { PostManager } from "./PostManager.js";
export declare class MessagePost extends BasePost {
    attachment: null;
    content: string;
    constructor(manager: PostManager, options: MessagePostOptions);
    toData(): MessagePostPrivateData;
    toClientData(): MessagePostClientData;
}
export interface MessagePostOptions extends BasePostOptions {
    content: string;
    attachment: null;
}
export interface MessagePostPrivateData extends MessagePostClientData {
    content: string;
    attachment: null;
}
export interface MessagePostClientData extends BasePostPrivateData {
}
