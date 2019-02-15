const express = require("express");
const socketIO = require("socket.io");
const path = require("path");
const Sentry = require("@sentry/node");

Sentry.init({
	dsn: "https://34ba3fad20a24955bc65dc9c2595ed3e@sentry.io/1391576"
});

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, "../dist/index.html");

const clientHandler = require("./clientHandler");
const gameHandler = require("./gameHandler");
const roomHandler = require("./roomHandler");

const server = express()
	.use(Sentry.Handlers.requestHandler())
	.use(function(req, res, next) {
		if (req.secure || process.env.NODE_ENV === "development") {
			next();
		} else {
			res.redirect("https://" + req.headers.host + req.url);
		}
	})
	.use(express.static("dist"))
	.all("*", (req, res) => {
		res.set("Content-Type", "text/html");
		res.sendFile(INDEX);
	})
	// .use(Sentry.Handlers.errorHandler())
	.listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.on("connection", function(socket) {
	const client = clientHandler(socket, io);

	client.on("close", () => error("timeout"));

	const { createRoom, joinRoom, joinRoomComputer, error } = roomHandler(
		client,
		io
	);
	const { selectHand, replay, roundEnd } = gameHandler(client, io);

	client.on("createRoom", createRoom);

	client.on("joinRoom", joinRoom);

	client.on("joinRoomCompuer", joinRoomComputer);

	client.on("disconnecting", () => error("disconnecting"));

	client.on("disconnect", () => error("timeout"));

	client.on("connect_timeout", () => error("timeout"));

	client.on("connect_error", () => error("error"));

	client.on("disconnect", () => error("error"));

	client.on("replay", replay);

	client.on("selectHand", selectHand);

	client.on("roundEnd", roundEnd);
});
