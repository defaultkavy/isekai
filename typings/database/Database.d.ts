import { Db } from "mongodb";
import { Client } from "../client/Client.js";
import { Base } from "../lib/Base.js";
import { DbCollection } from "./DbCollection.js";
import { MessagePostData } from "../lib/MessagePost.js";
import { UserData } from "../lib/User.js";
export declare class Database extends Base {
    private db;
    users: DbCollection;
    posts: DbCollection;
    constructor(client: Client, db: Db);
}
export declare enum CollectionName {
    users = "users",
    posts = "posts"
}
export declare type CollectionData = UserData | MessagePostData;
