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

	client.on("close", () => error("timeout"));

	const { createRoom, joinRoom, error } = roomHandler(client, io);
	const { reset, selectHand, replay } = gameHandler(client, io);

	client.on("createRoom", createRoom);

	client.on("joinRoom", joinRoom);

	client.on("disconnecting", () => error("disconnecting"));

	client.on("disconnect", () => error("timeout"));

	client.on("connect_timeout", () => error("timeout"));

	client.on("connect_error", () => error("error"));

	client.on("disconnect", () => error("error"));

	client.on("reset", reset);

	client.on("replay", replay);

	client.on("selectHand", selectHand);

	// client.on("error", () => error("error"));
});
