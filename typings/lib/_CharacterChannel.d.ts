import { BaseChannel, BaseChannelOptions } from "./_BaseChannel.js";
import { Character } from "./_Character.js";
export declare class CharacterChannel extends BaseChannel {
    constructor(parent: Character, options: CharacterChannelOptions);
}
export interface CharacterChannelOptions extends BaseChannelOptions {
}
