/**
 * Created by miguel on 18/05/17.
 */

const uuid = require("uuid");

module.exports = class Player {
    constructor({name = ""}) {
        this.id = uuid();
        this.name = name;
    }
};