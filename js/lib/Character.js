"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
const BaseCharacter_js_1 = require("./BaseCharacter.js");
const CharacterChannel_js_1 = require("./CharacterChannel.js");
class Character extends BaseCharacter_js_1.BaseCharacter {
    constructor(parent, options) {
        super(parent.client, options);
        this.channel = new CharacterChannel_js_1.CharacterChannel(this, options.channel);
    }
}
exports.Character = Character;
//# sourceMappingURL=Character.js.map