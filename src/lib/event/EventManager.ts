import { Client } from "../../client/Client.js";
import { DbCollection } from "../../database/DbCollection.js";
import { NotFound } from "../../errors/NotFound.js";
import { BaseManager } from "../BaseManager.js";
import { Snowflake } from "../SnowflakeManager.js";
import { Event, EventData, EventTypes } from "./Event.js";
import { LikeEvent, LikeEventData } from "./LikeEvent.js";

export class EventManager extends BaseManager<Event, EventData, EventCreateData> {
    collection: DbCollection<EventData>;
    type = 'Event';
    constructor(client: Client) {
        super(client);
        this.collection = this.client.db.events;
    }

    async createLike(data: LikeEventCreateData) {
        return await this.__create({...data, type: EventTypes.like});
    }

    async fetchBySubscriber(userId: Snowflake) {
        const events = await this.client.db.events.getDataByFilter({
            subscribers: userId
        })
        if (!events) throw new NotFound(`fetch: ${this.type} not exist.`);
        return this.__cacheSetList(events);
    }

    build(data: EventData): Event {
        if (data.type === EventTypes.like) {
            const likeData =  data as LikeEventData
            likeData.activate = true
            return new LikeEvent(this, likeData);
        } else throw 'build: Event type error'
    }
}

export interface EventCreateData extends Omit<EventData, 'createdTimestamp'> {}
export interface LikeEventCreateData extends Omit<LikeEventData, 'createdTimestamp' | 'type' | 'activate'> {}