import { BaseData, BaseDbObject } from "./BaseDbObject.js";
import { NotificationSubManager } from "./NotificationSubManager.js";
import { Snowflake } from "./SnowflakeManager.js";
export declare class NotificationSub extends BaseDbObject {
    id: Snowflake;
    createdTimestamp: number;
    endpoint: string;
    userId: Snowflake;
    keys: {
        p256dh: string;
        auth: string;
    };
    constructor(manager: NotificationSubManager, builder: NotificationSubBuilder);
    toData(): NotificationSubData;
    get webPushSubscription(): {
        endpoint: string;
        keys: {
            p256dh: string;
            auth: string;
        };
    };
}
export interface NotificationSubData extends BaseData {
    endpoint: string;
    userId: Snowflake;
    keys: {
        p256dh: string;
        auth: string;
    };
}
export interface NotificationSubBuilder extends BaseData {
    endpoint: string;
    userId: Snowflake;
    keys: {
        p256dh: string;
        auth: string;
    };
}
