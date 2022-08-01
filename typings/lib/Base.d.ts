import { Client } from "../client/Client.js";
import { Snowflake } from "./SnowflakeManager.js";
export declare abstract class Base {
    client: Client;
    constructor(client: Client);
}
export interface Id<T extends Base> {
    id: Snowflake;
}
