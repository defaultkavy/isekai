import { AssetData } from "../Asset.js";
import { BaseData, BaseDbObject } from "../BaseDbObject.js";
import { Snowflake } from "../SnowflakeManager.js";
import { EventManager } from "./EventManager.js";

export abstract class Event extends BaseDbObject {
    id: string;
    createdTimestamp: number;
    type: EventTypes;
    subscribers: Snowflake[];
    constructor(manager: EventManager, builder: EventBuilder) {
        super(manager);
        this.id = builder.id;
        this.createdTimestamp = builder.createdTimestamp;
        this.type = builder.type;
        this.subscribers = builder.subscribers;
    }

    toData(): EventData {
        return {
            id: this.id,
            createdTimestamp: this.createdTimestamp,
            type: this.type,
            subscribers: this.subscribers
        }
    }

    abstract toNotification(): Promise<NotificationData>;
}

export enum EventTypes {
    like
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
    content: string;
    image: AssetData;
    type: EventTypes;
}