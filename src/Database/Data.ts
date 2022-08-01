import { Document } from "mongodb";
import { PostData } from "../lib/Post.js";
import { UserData } from "../lib/User.js";

export class Data {
    constructor(doc: Document) {
        Object.assign(this, doc)
    }

    isPostData(): this is PostData {
        return true
    }

    isUserData(): this is UserData {
        return true
    }
}