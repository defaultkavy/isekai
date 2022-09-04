import { Client } from "../../client/Client.js";
import { DbCollection } from "../../database/DbCollection.js";
import { BaseManager } from "../BaseManager.js";
import { Event, EventData, EventTypes } from "./Event.js";
import { LikeEvent, LikeEventData } from "./LikeEvent.js";

export class EventManager extends BaseManager<Event, EventData, EventCreateData> {
    collection: DbCollection<EventData>;
    type = 'Asset';
    constructor(client: Client) {
        super(client);
        this.collection = this.client.db.events;
    }

    async createLike(data: LikeEventCreateData) {
        return await this.__create({...data, type: EventTypes.like});
    }

    async build(data: EventData): Promise<Event> {
        if (data.type === EventTypes.like) {
            const likeData =  data as LikeEventData
            likeData.activate = true
            return new LikeEvent(this, likeData);
        } else throw 'build: Event type error'
    }
}

export interface EventCreateData extends Omit<EventData, 'createdTimestamp'> {}
export interface LikeEventCreateData extends Omit<LikeEventData, 'createdTimestamp' | 'type' | 'activate'> {}