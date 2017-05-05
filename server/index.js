/**
 * Created by miguel on 02/05/17.
 */

const gameport = process.env.PORT || 8000;
const io = require('socket.io');
const express = require('express');
const UUID = require('node-uuid');
const verbose = false;
const app = express.createServer();

/* Express server set up. */

app.listen(gameport, function () {
    console.log('\t :: Express :: Listening on port', gameport);
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.get("/*", function (req, res, next) {
    let file = req.params[0];
    if (verbose) console.log('\t :: Express :: file requested:', file);
    res.sendFile(`${__dirname}/${file}`)
});

/* Socket.IO server set up. */

let sio = io.listen(app);

sio.configure(function () {
    sio.set("log level", 0);
    sio.set("authorization", function (handshakeData, callback) {
        callback(null, true);
    });
});

sio.sockets.on("connection", function (client) {
    client.userId = UUID();
    client.emit("onconnected", {id: client.userId});
    console.log('\t socket.io:: player', client.userid, 'connected');
    client.on("disconnect", function () {
        console.log('\t socket.io:: client disconnected', client.userId);
    });
});