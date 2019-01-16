const express = require("express");
const socketIO = require("socket.io");
const path = require("path");

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, "index.html");

require("dotenv").config();

const server = express()
	.use(express.static("dist"))
	.listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

var Game = require("./Room");

io.on("connection", function(socket) {
	console.log(socket);
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
