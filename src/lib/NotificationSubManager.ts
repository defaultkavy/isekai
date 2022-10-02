import { Client } from "../client/Client.js";
import { DbCollection } from "../database/DbCollection.js";
import { NotFound } from "../errors/NotFound.js";
import { BaseManager } from "./BaseManager.js";
import { NotificationSub, NotificationSubData } from "./NotificationSub.js";
import { Snowflake } from "./SnowflakeManager.js";

export class NotificationSubManager extends BaseManager<NotificationSub, NotificationSubData, NotificationSubCreateData> {
    collection: DbCollection<NotificationSubData>;
    type = 'Notification Subscribe';
    constructor(client: Client) {
        super(client);
        this.collection = this.client.db.notificationSubs;
    }

    async subscribe(data: NotificationSubCreateData) {
        const duplicateData = await this.collection.getDataByFilterOne({keys: data.keys, userId: data.userId});
        if (duplicateData) return this.build(duplicateData);
        return await this.__create(data);
    }

    async fetchByUser(userId: Snowflake) {
        const subs = await this.collection.getDataByFilter({userId: userId});
        if (!subs)  throw new NotFound(`fetch: ${this.type} not exist with user`);
        return this.__cacheSetList(subs);
    }

    async build(data: NotificationSubData): Promise<NotificationSub> {
        return new NotificationSub(this, data)
    }
}

export interface NotificationSubCreateData extends Omit<NotificationSubData, 'createdTimestamp'> {}