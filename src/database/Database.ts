import { Db } from "mongodb";
import { Client } from "../client/Client.js";
import { AssetData } from "../lib/Asset.js";
import { Base } from "../lib/Base.js";
import { BasePostData } from "../lib/BasePost.js";
import { EventData } from "../lib/event/Event.js";
import { MessagePostPublicData } from "../lib/MessagePost.js";
import { UserData, UserPublicData } from "../lib/User.js";
import { DbCollection } from "./DbCollection.js";

export class Database extends Base {
    private db: Db;
    users: DbCollection<UserData>;
    posts: DbCollection<BasePostData>;
    assets: DbCollection<AssetData>;
    events: DbCollection<EventData>;
    constructor(client: Client, db: Db) {
        super(client)
        this.db = db
        this.users = new DbCollection(this, db.collection(CollectionName.users));
        this.posts = new DbCollection(this, db.collection(CollectionName.posts));
        this.assets = new DbCollection(this, db.collection(CollectionName.assets));
        this.events = new DbCollection(this, db.collection(CollectionName.events));
    }
}

export enum CollectionName {
    users = 'users',
    posts = 'posts',
    assets = 'assets',
    events = 'events'
}

export type CollectionData = UserPublicData | MessagePostPublicData