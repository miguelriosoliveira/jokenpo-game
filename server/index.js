/**
 * Created by miguel on 02/05/17.
 */

const express = require('express');
const app = express();
const chalk = require("chalk");
const gamePort = process.env.PORT || 8000;
const TANK_INIT_HP = 100;


/* ============================== Express server set up ============================== */

// Static resources server
app.use(express.static("_dist/"));

// Make server listen to requisitions
let server = app.listen(gamePort, function () {
    let port = server.address().port;
    console.log(chalk.green("Server running at port " + chalk.bold(port)));
});

/* ============================== Socket.IO server set up ============================== */

const fs = require("fs");
const socket = require("socket.io")(server);

const RoomManager = require("./RoomManager");
const Player = require("./Player");

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

        // Criar objeto player com os dados enviados pelo cliente
        let player = new Player(playerData);

        // procurar por salas abertas
        // se achar sala aberta, colocar usuário nela
        // caso contrário, criar sala e colocá-lo lá
        roomManager.putPlayerOnFirstFreeSpace(player);
        console.log(roomManager.rooms);
    })
});