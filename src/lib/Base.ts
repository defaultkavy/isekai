import { Client } from "../client/Client.js";
import { Snowflake } from "./SnowflakeManager.js";

export abstract class Base {
    client: Client;
    constructor(client: Client) {
        this.client = client
    }
}

export interface Id<T extends Base> {
    id: Snowflake
}