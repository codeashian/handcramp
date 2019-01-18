const express = require("express");
const socketIO = require("socket.io");
const path = require("path");

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, "../dist/index.html");

const clientHandler = require("./clientHandler");
const gameHandler = require("./gameHandler");
const roomHandler = require("./roomHandler");

const server = express()
	.use(express.static("dist"))
	.all("*", (req, res) => {
		res.sendFile(INDEX);
	})
	.listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.on("connection", function(socket) {
	const client = clientHandler(socket, io);

	const { createRoom, joinRoom, disconnecting } = roomHandler(client, io);
	const { reset, selectHand } = gameHandler(client, io);

	client.on("createRoom", createRoom);

	client.on("joinRoom", joinRoom);

	client.on("selectHand", selectHand);

	client.on("reset", reset);

	client.on("disconnecting", disconnecting);
});
