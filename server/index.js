var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);

var Game = require("./Room");

server.listen(8080);

io.on("connection", function(socket) {
	socket.on("createRoom", () => {
		const roomId = (Math.random() * 100000) | 0;
		const game = new Game(socket, io);
		game.create(roomId);
	});

	socket.on("joinRoom", roomId => {
		const game = new Game(socket, io);
		game.join(roomId);
	});
});
