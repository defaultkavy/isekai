import { BaseCharacter, BaseCharacterOptions } from "./_BaseCharacter.js";
import { CharacterChannel, CharacterChannelOptions } from "./_CharacterChannel.js";
import { User } from "./User.js";

export class Character extends BaseCharacter {
    channel: CharacterChannel;
    constructor(parent: User, options: CharacterOptions) {
        super(parent.client, options)
        this.channel = new CharacterChannel(this, options.channel)
    }
}

export interface CharacterOptions extends BaseCharacterOptions {
    channel: CharacterChannelOptions
}