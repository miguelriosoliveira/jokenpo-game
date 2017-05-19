module.exports = class Room {
    constructor() {
        this.player1 = null;
        this.player2 = null;
    }

    addPlayer(player) {
        if (!this.player1)
            this.player1 = player;
        else if (!this.player2)
            this.player2 = player;
        else throw "Room is full!";
    }

    isOpen() {
        return !this.player1 || !this.player2;
    }

    isFull() {
        return this.player1 || this.player2;
    }
};