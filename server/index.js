/**
 * Created by miguel on 02/05/17.
 */

const app = require("express")();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

let server = app.listen(8000, function () {
    let port = server.address().port;
    console.log("Server running at port %s", port);
});

const io = require("socket.io")(server);

io.on("connection", function (socket) {
    console.log("a user connected");
    socket.on("disconnect", function () {
        console.log("user disconnected");
    });
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
    });
});