let socket = io.connect("localhost:8000");

socket.on("addTank", function (tank) {
    console.log("pediu pro servidor adicionar um tank!");
});

$(document).ready(function () {
    $("#join").click(function () {
        console.log("emitiu 'joinGame'");
        socket.emit("joinGame", {id: "meu-tank", type: "panzer"});
    });
});