import { BaseData, BaseDbObject } from "./BaseDbObject.js";
import { NotificationSubManager } from "./NotificationSubManager.js";
import { Snowflake } from "./SnowflakeManager.js";

export class NotificationSub extends BaseDbObject {
    id: Snowflake;
    createdTimestamp: number;
    endpoint: string;
    userId: Snowflake;
    keys: {
        p256dh: string;
        auth: string;
    }
    constructor(manager: NotificationSubManager, builder: NotificationSubBuilder) {
        super(manager);
        this.id = builder.id;
        this.createdTimestamp = builder.createdTimestamp;
        this.endpoint = builder.endpoint;
        this.userId = builder.userId;
        this.keys = builder.keys;
    }

    toData(): NotificationSubData {
        return {
            id: this.id,
            createdTimestamp: this.createdTimestamp,
            endpoint: this.endpoint,
            userId: this.userId,
            keys: this.keys,
        }
    }

    webPushSubscription() {
        return {
            endpoint: this.endpoint,
            keys: this.keys
        }
    }
}

export interface NotificationSubData extends BaseData {
    endpoint: string;
    userId: Snowflake;
    keys: {
        p256dh: string;
        auth: string;
    }
}

export interface NotificationSubBuilder extends BaseData {
    endpoint: string;
    userId: Snowflake;
    keys: {
        p256dh: string;
        auth: string;
    }
}