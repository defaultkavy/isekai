import { Client } from "../client/Client.js";
import { Base } from "./Base.js";
import { Character } from "./_Character.js";

export class BaseChannel extends Base {
    /**
     * The channel owner
     */
    owner: Character
    type: ChannelTypes;
    constructor(client: Client, options: BaseChannelOptions) {
        super(client)
        this.owner = options.owner
        this.type = options.type
    }
}

export interface BaseChannelOptions {
    owner: Character,
    type: ChannelTypes
}

export enum ChannelTypes {
    CharacterChannel = 'CHARACTER_CHANNEL'
}