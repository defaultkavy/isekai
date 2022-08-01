import { Client } from "../client/Client.js";
import { Base } from "./Base.js";
import { Character } from "./_Character.js";
export declare class BaseChannel extends Base {
    /**
     * The channel owner
     */
    owner: Character;
    type: ChannelTypes;
    constructor(client: Client, options: BaseChannelOptions);
}
export interface BaseChannelOptions {
    owner: Character;
    type: ChannelTypes;
}
export declare enum ChannelTypes {
    CharacterChannel = "CHARACTER_CHANNEL"
}
