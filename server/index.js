/**
 * Created by miguel on 02/05/17.
 */

const gamePort = process.env.PORT || 8000;
const express = require('express');
const app = express();
const TANK_INIT_HP = 100;


/* ============================== Express server set up ============================== */

// Static resources server
app.use(express.static("client"));

// Make server listen to requisitions
let server = app.listen(gamePort, function () {
    let port = server.address().port;
    console.log("Server running at port %s", port);
});

/* ============================== Socket.IO server set up ============================== */

const io = require("socket.io")(server);
const Chance = require("chance");

// evento de conexão (quando alguem connecta no jogo)
io.on("connection", function (client) {
    console.log("User connected");

    // cleinte pedindo pra entrar??
    // TODO: pra mim ainda é a mesma coisa que o evento "connection"
    client.on("joinGame", function (tank) {
        console.log(tank.id + " joined the game");
        let chance = new Chance();
        let initX = chance.natural({min: 40, max: 900});
        let initY = chance.natural({min: 40, max: 500});

        //cliente pedindo para o servidor adicionar tank
        client.emit("addTank", {id: tank.id, type: tank.type, isLocal: true, x: initX, y: initY, hp: TANK_INIT_HP});

        //cliente dizendo pra todos que está adicionando tank
        client.broadcast.emit("addTank", {
            id: tank.id,
            type: tank.type,
            isLocal: false,
            x: initX,
            y: initY,
            hp: TANK_INIT_HP
        });

        // game.addTank({id: tank.id, type: tank.type, hp: TANK_INIT_HP});
    })
});