import { Snowflake } from "../SnowflakeManager.js";
import { Event, EventBuilder, EventData, EventTypes, NotificationData } from "./Event.js";
import { EventManager } from "./EventManager.js";

export class LikeEvent extends Event {
    postId: Snowflake;
    userId: Snowflake;
    activate: boolean;
    constructor(manager: EventManager, builder: LikeEventBuilder) {
        super(manager, builder);
        this.postId = builder.post;
        this.userId = builder.user;
        this.activate = builder.activate;
    }

    async deactive() {
        this.activate = false;
        await this.delete();
    }

    async toNotification(): Promise<NotificationData> {
        const user = await this.client.users.fetch(this.userId);
        return {
            id: this.id,
            content: `${user.displayName} liked your post`,
            image: (await user.getAvatar().then(avatar => avatar.toData()).catch(err => undefined)),
            type: this.type,
            createdTimestamp: this.createdTimestamp,
            url: `/post/${this.postId}`
        }
    }

    toData(): LikeEventData {
        return {
            ...super.toData(),
            post: this.postId,
            user: this.userId,
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