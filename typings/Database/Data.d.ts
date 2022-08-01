import { Document } from "mongodb";
import { PostData } from "../lib/Post.js";
import { UserData } from "../lib/User.js";
export declare class Data {
    constructor(doc: Document);
    isPostData(): this is PostData;
    isUserData(): this is UserData;
}
