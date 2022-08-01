import { BaseCharacter, BaseCharacterOptions } from "./_BaseCharacter.js";
import { CharacterChannel, CharacterChannelOptions } from "./_CharacterChannel.js";
import { User } from "./User.js";
export declare class Character extends BaseCharacter {
    channel: CharacterChannel;
    constructor(parent: User, options: CharacterOptions);
}
export interface CharacterOptions extends BaseCharacterOptions {
    channel: CharacterChannelOptions;
}
