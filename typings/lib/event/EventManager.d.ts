import { Client } from "../../client/Client.js";
import { DbCollection } from "../../database/DbCollection.js";
import { BaseManager } from "../BaseManager.js";
import { Snowflake } from "../SnowflakeManager.js";
import { Event, EventData } from "./Event.js";
import { LikeEventData } from "./LikeEvent.js";
export declare class EventManager extends BaseManager<Event, EventData, EventCreateData> {
    collection: DbCollection<EventData>;
    type: string;
    constructor(client: Client);
    createLike(data: LikeEventCreateData): Promise<Event>;
    fetchBySubscriber(userId: Snowflake): Promise<Event[]>;
    build(data: EventData): Event;
}
export interface EventCreateData extends Omit<EventData, 'createdTimestamp'> {
}
export interface LikeEventCreateData extends Omit<LikeEventData, 'createdTimestamp' | 'type' | 'activate'> {
}
