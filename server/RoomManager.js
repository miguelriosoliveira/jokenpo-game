const Room = require("./Room");

module.exports = class RoomManager {
    constructor() {
        this.rooms = [];
    }

    createRoom() {
        this.rooms.push(new Room());
    }

    putPlayerOnFirstFreeSpace(player) {
        for (let room of this.rooms) {
            if (room.isOpen()) {
                room.addPlayer(player);
                return;
            }
        }
        this.createRoom();
        this.putPlayerOnFirstFreeSpace(player);
    }
};