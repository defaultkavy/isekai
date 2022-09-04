import { Snowflake } from "../SnowflakeManager.js";
import { Event, EventBuilder, EventData, EventTypes } from "./Event.js";
import { EventManager } from "./EventManager.js";
export declare class LikeEvent extends Event {
    post: Snowflake;
    user: Snowflake;
    activate: boolean;
    constructor(manager: EventManager, builder: LikeEventBuilder);
    toData(): LikeEventData;
}
export interface LikeEventData extends EventData {
    type: EventTypes.like;
    post: Snowflake;
    user: Snowflake;
    activate: boolean;
}
export interface LikeEventBuilder extends EventBuilder {
    post: Snowflake;
    user: Snowflake;
    activate: boolean;
}