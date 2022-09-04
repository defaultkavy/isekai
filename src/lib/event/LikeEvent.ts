import { Snowflake } from "../SnowflakeManager.js";
import { Event, EventBuilder, EventData, EventTypes } from "./Event.js";
import { EventManager } from "./EventManager.js";

export class LikeEvent extends Event {
    post: Snowflake;
    user: Snowflake;
    activate: boolean;
    constructor(manager: EventManager, builder: LikeEventBuilder) {
        super(manager, builder);
        this.post = builder.post;
        this.user = builder.user;
        this.activate = builder.activate;
    }

    toData(): LikeEventData {
        return {
            ...super.toData(),
            post: this.post,
            user: this.user,
            activate: this.activate
        }
    }
}

export interface LikeEventData extends EventData {
    type: EventTypes.like
    post: Snowflake;
    user: Snowflake;
    activate: boolean;
}

export interface LikeEventBuilder extends EventBuilder {
    post: Snowflake;
    user: Snowflake;
    activate: boolean;
}