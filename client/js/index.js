/* globals io */

let socket = io.connect("localhost:8000");
let GAME_EVENTS = {};

socket.on("connect", () => console.log("Connected to server!"));
socket.on("game-events", gameEvents => {
    GAME_EVENTS = gameEvents;
    socket.on(GAME_EVENTS.START_GAME, () => console.log("New challenger, game started!"));
});
socket.on("message", message => console.log(message));

$(document).ready(function () {
    $("#user-name").submit(event => {
        event.preventDefault();
        socket.emit(GAME_EVENTS.JOIN_GAME, {name: $("#username").val()});
    });
});