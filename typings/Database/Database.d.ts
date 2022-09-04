import { Db } from "mongodb";
import { Client } from "../client/Client.js";
import { AssetData } from "../lib/Asset.js";
import { Base } from "../lib/Base.js";
import { BasePostData } from "../lib/BasePost.js";
import { EventData } from "../lib/event/Event.js";
import { MessagePostPublicData } from "../lib/MessagePost.js";
import { UserData, UserPublicData } from "../lib/User.js";
import { DbCollection } from "./DbCollection.js";
export declare class Database extends Base {
    private db;
    users: DbCollection<UserData>;
    posts: DbCollection<BasePostData>;
    assets: DbCollection<AssetData>;
    events: DbCollection<EventData>;
    constructor(client: Client, db: Db);
}
export declare enum CollectionName {
    users = "users",
    posts = "posts",
    assets = "assets",
    events = "events"
}
export declare type CollectionData = UserPublicData | MessagePostPublicData;
