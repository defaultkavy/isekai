import { BaseData, BaseDbObject } from "./BaseDbObject.js";
import { EventTypes } from "./event/Event.js";
import { LikeEvent } from "./event/LikeEvent.js";
import { MessagePost, MessagePostData } from "./MessagePost.js";
import { MessagePostCreateData, PostManager } from "./PostManager.js";
import { Snowflake } from "./SnowflakeManager.js";

export class BasePost extends BaseDbObject {
    id: Snowflake;
    author: Snowflake;
    createdTimestamp: number;
    type: PostTypes;
    parent: Snowflake | undefined;
    constructor(manager: PostManager, options: BasePostOptions) {
        super(manager);
        this.id = options.id;
        this.author = options.author;
        this.createdTimestamp = options.createdTimestamp;
        this.type = options.type;
        this.parent = options.parent;
    }

    toData(): BasePostData {
        return {
            author: this.author,
            id: this.id,
            createdTimestamp: this.createdTimestamp,
            type: this.type,
            parent: this.parent
        }
    }

    async toPublicData(): Promise<BasePostPublicData> {
        const threads = await this.threadCount();
        return {
            ...this.toData(),
            likes: await this.likeCount(),
            threads: threads,
            thread: threads ? (await this.thread()).toData() : undefined
        }
    }

    async toClientData(user: Snowflake): Promise<BasePostClientData> {
        return {
            ...(await this.toPublicData()),
            like: !!await this.clientLike(user)
        }
    }

    async reply(data: MessagePostCreateData) {
        return await this.client.posts.__create({...data, parent: this.id});
    }

    async thread(): Promise<MessagePost> {
        const postData = await this.client.db.posts.getNewestData(1, { parent: this.id });
        return await this.client.posts.__cacheSet(postData[0]) as MessagePost;
    }

    async threads(lastId?: Snowflake) {
        let postsData: BasePostData[] = [];
        if (lastId) postsData = await this.client.db.posts.getDataByLastId(lastId, 50, { parent: this.id });
        else postsData = await this.client.db.posts.getNewestData(50, { parent: this.id });
        return await this.client.posts.__cacheSetList(postsData);
    }

    async threadCount() {
        return await this.client.db.posts.getCount({ parent: this.id });
    }

    async likeCount() {
        return await this.client.db.events.getCount({ post: this.id, activate: true, type: EventTypes.like });
    }

    async likeUsers() {
        return await this.client.db.events.getDataByFilter({ post: this.id, activate: true, type: EventTypes.like }, 50);
    }

    async clientLike(userId: Snowflake): Promise<LikeEvent | undefined> {
        return await this.client.events.fetchByFilter({ post: this.id, user: userId, type: EventTypes.like, activate: true }).catch(err => undefined) as LikeEvent;
    }
}

export interface BasePostOptions {
    id: Snowflake;
    author: Snowflake;
    createdTimestamp: number;
    type: PostTypes
    parent: Snowflake | undefined;
}

export interface BasePostClientData extends BasePostPublicData {
    like: boolean;
}

export interface BasePostPublicData extends BasePostData {
    likes: number;
    threads: number;
    thread?: MessagePostData;
}

export interface BasePostData extends BaseData {
    id: Snowflake;
    author: Snowflake;
    type: PostTypes;
    parent: Snowflake | undefined;
}

export declare const enum PostTypes {
    Message,
    Article,
    Gallery
}