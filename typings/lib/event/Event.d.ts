import { BaseData, BaseDbObject } from "../BaseDbObject.js";
import { Snowflake } from "../SnowflakeManager.js";
import { EventManager } from "./EventManager.js";
export declare class Event extends BaseDbObject {
    id: string;
    createdTimestamp: number;
    type: EventTypes;
    constructor(manager: EventManager, builder: EventBuilder);
    toData(): EventData;
}
export declare enum EventTypes {
    like = 0
}
export interface EventData extends BaseData {
    type: EventTypes;
}
export interface EventBuilder {
    id: Snowflake;
    createdTimestamp: number;
    type: EventTypes;
}
