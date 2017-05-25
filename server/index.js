/**
 * Created by miguel on 02/05/17.
 */

const express = require('express');
const app = express();
const chalk = require("chalk");

/* ============================== Express server set up ============================== */

// Static resources server
app.set("port", process.env.PORT || 8000);
app.use(express.static("_dist/"));

// Make server listen to requisitions
let server = app.listen(app.get("port"), function () {
    console.log(chalk.green("Server running at port " + chalk.bold(app.get("port"))));
});

/* ============================== Socket.IO server set up ============================== */

const socket = require("socket.io")(server);
const fs = require("fs");

const RoomManager = require("./modules/RoomManager");
const Player = require("./modules/Player");

let GAME_EVENTS = {};
let roomManager = new RoomManager();

function getGameEvents() {
    GAME_EVENTS = JSON.parse(fs.readFileSync(__dirname + "/game-events.json"));
    return GAME_EVENTS;
}

// evento de conexão (quando alguem connecta no jogo)
socket.on("connection", function (client) {
    console.log("User connected");
    socket.emit("game-events", getGameEvents());

    // cliente pedindo pra entrar
    client.on(GAME_EVENTS.JOIN_GAME, function (playerData) {
        console.log("User wants to play", playerData);
        let playerRoom = roomManager.putPlayerOnFirstFreeSpace(new Player(playerData));
        console.log(roomManager.rooms);
        socket.send(playerData.name + " joined room!");
        if (playerRoom.isFull()) {
            socket.emit(GAME_EVENTS.START_GAME);
        }
    });
});