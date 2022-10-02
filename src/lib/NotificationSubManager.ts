import { Client } from "../client/Client.js";
import { DbCollection } from "../database/DbCollection.js";
import { BaseManager } from "./BaseManager.js";
import { NotificationSub, NotificationSubData } from "./NotificationSub.js";

export class NotificationSubManager extends BaseManager<NotificationSub, NotificationSubData, NotificationSubCreateData> {
    collection: DbCollection<NotificationSubData>;
    type = 'Notification Subscribe';
    constructor(client: Client) {
        super(client);
        this.collection = this.client.db.notificationSubs;
    }

    async subscribe(data: NotificationSubCreateData) {
        return await this.__create(data);
    }

    async build(data: NotificationSubData): Promise<NotificationSub> {
        return new NotificationSub(this, data)
    }
}

export interface NotificationSubCreateData extends NotificationSubData {}