"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
const _BaseCharacter_js_1 = require("./_BaseCharacter.js");
const _CharacterChannel_js_1 = require("./_CharacterChannel.js");
class Character extends _BaseCharacter_js_1.BaseCharacter {
    constructor(parent, options) {
        super(parent.client, options);
        this.channel = new _CharacterChannel_js_1.CharacterChannel(this, options.channel);
    }
}
exports.Character = Character;
//# sourceMappingURL=_Character.js.map