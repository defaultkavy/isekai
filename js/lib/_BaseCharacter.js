"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCharacter = void 0;
const Base_js_1 = require("./Base.js");
/**
 * The base class for {@link Character}
 */
class BaseCharacter extends Base_js_1.Base {
    constructor(client, options) {
        super(client);
        this.id = options.id;
        this.name = options.name;
    }
}
exports.BaseCharacter = BaseCharacter;
//# sourceMappingURL=_BaseCharacter.js.map