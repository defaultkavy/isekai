import { BaseChannel, BaseChannelOptions } from "./_BaseChannel.js";
import { Character } from "./_Character.js";
import { PostManager } from "./PostManager.js";

export class CharacterChannel extends BaseChannel {
    constructor(parent: Character, options: CharacterChannelOptions) {
        super(parent.client, options)
    }
}

export interface CharacterChannelOptions extends BaseChannelOptions {
    
}