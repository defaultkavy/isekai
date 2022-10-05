import { AssetData } from "../Asset.js";
import { BaseData, BaseDbObject } from "../BaseDbObject.js";
import { Snowflake } from "../SnowflakeManager.js";
import { EventManager } from "./EventManager.js";
export declare abstract class Event extends BaseDbObject {
    id: string;
    createdTimestamp: number;
    type: EventTypes;
    subscribers: Snowflake[];
    constructor(manager: EventManager, builder: EventBuilder);
    toData(): EventData;
    abstract toNotification(): Promise<NotificationData>;
}
export declare enum EventTypes {
    like = 0
}
export interface EventData extends BaseData {
    type: EventTypes;
    subscribers: Snowflake[];
}
export interface EventBuilder {
    id: Snowflake;
    createdTimestamp: number;
    type: EventTypes;
    subscribers: Snowflake[];
}
export interface NotificationData {
    id: string;
    content: string;
    image: AssetData | undefined;
    type: EventTypes;
    createdTimestamp: number;
}
