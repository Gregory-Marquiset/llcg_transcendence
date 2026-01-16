import * as presence from "../presence/presenceService.js";
import { connectionsIndex } from "./connexionRegistry.js";


let connectId = 0;
const maxChatPayloadSize = 16 * 1024;

export const websocketHandler = async function (socket, req) {
	try {
		// console.log(`websocketHandler socket type: ${socket?.constructor?.name}\n`);
		// console.log(`websocketHandler req type: ${req?.constructor?.name}\n`);
		// console.log(`websocketHandler socket typeof socket.close: ${typeof socket.close}\n`);
		// console.log(`websocketHandler socket typeof socket.socket?.close: ${typeof socket.socket?.close}\n`);
		await req.jwtVerify();
		socket.isAlive = true;
		socket.badFrames = 0;
		let date = new Date().toISOString();
		console.log(`\nwebsocketHandler: new socket\n`);

		connectionsIndex.set(socket, {
			userId: req.user.id,
			connectionId: connectId++,
			ip: req.socket.remoteAddress,
		});

		socket.on("pong", () => {
			console.log(`\npong\n`);
			socket.isAlive = true;
		});

		presence.onSocketConnected(req.user.id, socket, date);

		socket.on("message", (event) => {
			try {
				let rawText;

				if (typeof event === "string")
					rawText = event;
				else if (Buffer.isBuffer(event))
					rawText = event.toString("utf8");
				else if (event instanceof Uint8Array)
					rawText = Buffer.from(event).toString("utf8");
				else
				{
					socket.badFrames++;
					if (socket.badFrames > 5)
						socket.close(1008, "too_much_bad_frames");
					socket.send(JSON.stringify({ type: "error", code: "unsupported_frame_type" }));
				}

				const bytes = new TextEncoder().encode(event).length;
				if (bytes > maxChatPayloadSize)
				{
					socket.badFrames++;
					if (socket.badFrames > 5)
						socket.close(1008, "too_much_bad_frames");
					socket.close(1009, "payload_too_large");
					return;
				}
				event.trim();
				if (event.length < 0)
				{
					socket.badFrames++;
					if (socket.badFrames > 5)
						socket.close(1008, "too_much_bad_frames");
					socket.send(JSON.stringify({ type: "error", code: "empty_message" }));
				}

				const obj = JSON.parse(event);

				if (obj.msg)
					console.log(`websocketHandler Message: ${obj.msg}\n`);
				socket.send(JSON.stringify({ message: "Message bien recu" }));

			} catch (err) {
				console.error(`\nERROR websocketHandler on message: error stack: ${err.stack},\nmessage: ${err.message}, name: ${err.name}\n`);
				if (err.name === "SyntaxError")
				{
					socket.badFrames++;
					if (socket.badFrames > 5)
						socket.close(1008, "too_much_bad_frames");
					socket.send(JSON.stringify({ type: "error", code: "invalid_json" }));
				}
			}
		});

		socket.on("close", (code, reason) => {
			date = new Date().toISOString();
			presence.onSocketDisconnected(req.user.id, socket, date);
			connectionsIndex.delete(socket);
			console.log(`\nwebsocketHandler socket.on close, code: ${code} and reason: ${reason}\n`);
		});

	} catch (err) {
		console.error(`\nERROR websocketHandler: error code: ${err.code}, message: ${err.message}\n`);
		if (err.code === "FST_JWT_AUTHORIZATION_TOKEN_EXPIRED")
			socket.close(1008, "token_expired");
		else
			socket.close(1008, "unauthorized");
	}
}

export const heartbeat = function () {
	console.log(`\nwebsocketHandler heartbeat\n`);
	connectionsIndex?.forEach((value, key) => {
		if (!key)
			return;
		console.log(`value.userId: ${value.userId}`);
		console.log(`value.connectionId: ${value.connectionId}`);
		console.log(`value.ip: ${value.ip}\n`);
		if (key.isAlive === false)
		{
			key.terminate();
			return;
		}
		key.isAlive = false;
		try {
			key.ping();
		} catch (err) {
			key.terminate();
		}
	});
}
