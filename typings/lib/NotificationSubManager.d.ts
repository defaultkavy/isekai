import { Client } from "../client/Client.js";
import { DbCollection } from "../database/DbCollection.js";
import { BaseManager } from "./BaseManager.js";
import { NotificationSub, NotificationSubData } from "./NotificationSub.js";
import { Snowflake } from "./SnowflakeManager.js";
export declare class NotificationSubManager extends BaseManager<NotificationSub, NotificationSubData, NotificationSubCreateData> {
    collection: DbCollection<NotificationSubData>;
    type: string;
    constructor(client: Client);
    subscribe(data: NotificationSubCreateData): Promise<NotificationSub>;
    fetchByUser(userId: Snowflake): Promise<NotificationSub[]>;
    build(data: NotificationSubData): Promise<NotificationSub>;
}
export interface NotificationSubCreateData extends Omit<NotificationSubData, 'createdTimestamp'> {
}
