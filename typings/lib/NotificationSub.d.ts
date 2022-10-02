import { BaseData, BaseDbObject } from "./BaseDbObject.js";
import { NotificationSubManager } from "./NotificationSubManager.js";
import { Snowflake } from "./SnowflakeManager.js";
export declare class NotificationSub extends BaseDbObject {
    id: Snowflake;
    createdTimestamp: number;
    endpoint: string;
    userId: Snowflake;
    constructor(manager: NotificationSubManager, builder: NotificationSubBuilder);
    toData(): NotificationSubData;
}
export interface NotificationSubData extends BaseData {
    endpoint: string;
    userId: Snowflake;
}
export interface NotificationSubBuilder extends BaseData {
    endpoint: string;
    userId: Snowflake;
}
