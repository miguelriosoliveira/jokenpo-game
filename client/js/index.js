/* globals io */

/* my port: 8000
 * heroku port: 5000 */
// TODO find a way to get the right address and port programmatically
let socket = io.connect("localhost:8000");
// let socket = io.connect("localhost:5000");
let GAME_EVENTS = {};

socket.on("connect", () => console.log("Connected to server!"));
socket.on("game-events", gameEvents => {
    GAME_EVENTS = gameEvents;
    socket.on(GAME_EVENTS.START_GAME, () => console.log("New challenger, game started!"));
});
socket.on("message", message => console.log(message));

$(document).ready(function () {
    $("#canvas")
});