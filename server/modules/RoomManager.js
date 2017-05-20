const Room = require("./Room");

class RoomManager {
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
                return room;
            }
        }
        this.createRoom();
        return this.putPlayerOnFirstFreeSpace(player);
    }
}

module.exports = RoomManager;