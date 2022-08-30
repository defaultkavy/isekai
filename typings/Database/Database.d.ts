import { Db } from "mongodb";
import { Client } from "../client/Client.js";
import { Base } from "../lib/Base.js";
import { MessagePostPublicData } from "../lib/MessagePost.js";
import { UserPublicData } from "../lib/User.js";
import { DbCollection } from "./DbCollection.js";
export declare class Database extends Base {
    private db;
    users: DbCollection;
    posts: DbCollection;
    assets: DbCollection;
    constructor(client: Client, db: Db);
}
export declare enum CollectionName {
    users = "users",
    posts = "posts",
    assets = "assets"
}
export declare type CollectionData = UserPublicData | MessagePostPublicData;
