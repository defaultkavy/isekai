import { BaseData, BaseDbObject } from "../BaseDbObject.js";
import { Snowflake } from "../SnowflakeManager.js";
import { EventManager } from "./EventManager.js";

export class Event extends BaseDbObject {
    id: string;
    createdTimestamp: number;
    type: EventTypes;
    constructor(manager: EventManager, builder: EventBuilder) {
        super(manager);
        this.id = builder.id;
        this.createdTimestamp = builder.createdTimestamp;
        this.type = builder.type;
    }

    toData(): EventData {
        return {
            id: this.id,
            createdTimestamp: this.createdTimestamp,
            type: this.type
        }
    }
}

export enum EventTypes {
    like
}

export interface EventData extends BaseData {
    type: EventTypes;
}

export interface EventBuilder {
    id: Snowflake;
    createdTimestamp: number;
    type: EventTypes;
}