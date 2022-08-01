import { Client } from "../client/Client.js";
import { Base } from "./Base.js";
import { Snowflake } from "./SnowflakeManager.js";

/**
 * The base class for {@link Character}
 */
export class BaseCharacter extends Base {
    /**
     * Character name
     */
    name: string;
    /**
     * Character snowflake id
     */
    id: Snowflake;
    constructor(client: Client, options: BaseCharacterOptions) {
        super(client)
        this.id = options.id
        this.name = options.name
    }
}

export interface BaseCharacterOptions {
    id: string,
    name: string
}