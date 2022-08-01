import { BasePost, BasePostData, BasePostOptions } from "./BasePost.js";
import { PostManager } from "./PostManager.js";
export declare class Post extends BasePost {
    constructor(manager: PostManager, options: PostOptions);
}
export interface PostOptions extends BasePostOptions {
}
export interface PostData extends BasePostData {
}
