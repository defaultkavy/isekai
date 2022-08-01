import { BasePost, BasePostData, BasePostOptions } from "./BasePost.js";
import { PostManager } from "./PostManager.js";

export class Post extends BasePost {
    constructor(manager: PostManager, options: PostOptions) {
        super(manager, options)
    }
    
}

export interface PostOptions extends BasePostOptions {
}

export interface PostData extends BasePostData {
}