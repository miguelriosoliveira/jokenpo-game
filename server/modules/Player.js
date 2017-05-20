/**
 * Created by miguel on 18/05/17.
 */

const uuid = require("uuid");

class Player {
    constructor({name = ""}) {
        this.id = uuid();
        this.name = name;
    }
}

module.exports = Player;