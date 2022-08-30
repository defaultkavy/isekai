import { Db } from "mongodb";
import { Client } from "../client/Client.js";
import { Base } from "../lib/Base.js";
import { MessagePostPublicData } from "../lib/MessagePost.js";
import { UserPublicData } from "../lib/User.js";
import { DbCollection } from "./DbCollection.js";

export class Database extends Base {
    private db: Db;
    users: DbCollection;
    posts: DbCollection;
    assets: DbCollection;
    constructor(client: Client, db: Db) {
        super(client)
        this.db = db
        this.users = new DbCollection(this, db.collection(CollectionName.users))
        this.posts = new DbCollection(this, db.collection(CollectionName.posts))
        this.assets = new DbCollection(this, db.collection(CollectionName.assets))
    }
}

export enum CollectionName {
    users = 'users',
    posts = 'posts',
    assets = 'assets',
}

export type CollectionData = UserPublicData | MessagePostPublicData