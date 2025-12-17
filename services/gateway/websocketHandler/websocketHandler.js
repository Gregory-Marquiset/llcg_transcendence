const connectionsIndex = new Map();
const sessionsByUser = new Map();
const userPresence = new Map();

let connectId = 0;

/* struct connectionsIndex :
{
	userId,
	connectionId,
	ip
	isAlive
}
*/

/* struct sessionsByUser :
{
	socketSet: Set(),
	offlineTimer,
	connectedSince
}
*/

/* struct userPresence :
{
	status,
	lastSeenAt,
	activeSince
}
*/

export const websocketHandler = async function (socket, req) {
	try {
		// console.log(`websocketHandler socket type: ${socket?.constructor?.name}\n`);
		// console.log(`websocketHandler req type: ${req?.constructor?.name}\n`);
		// console.log(`websocketHandler socket typeof socket.close: ${typeof socket.close}\n`);
		// console.log(`websocketHandler socket typeof socket.socket?.close: ${typeof socket.socket?.close}\n`);
		await req.jwtVerify();
		socket.isAlive = true;
		const date = new Date().toISOString();
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

		let currentUserSession = sessionsByUser.get(req.user.id);
		if (!currentUserSession)
		{
			currentUserSession = {
				socketSet: new Set(),
				offlineTimer: null,
				connectedSince: date,
			};
			sessionsByUser.set(req.user.id, currentUserSession);
		}
		currentUserSession.socketSet.add(socket);

		const currentUserPresence = userPresence.get(req.user.id);
		let isOnlineNow = currentUserSession.socketSet.size > 0;
		if (!currentUserPresence)
		{
			userPresence.set(req.user.id, {
				status: "online",
				lastSeenAt: null,
				activeSince: date
			});
		}
		else if (currentUserPresence.status === "offline" && isOnlineNow === true)
		{
			currentUserPresence.status = "online";
			currentUserPresence.lastSeenAt = null;
			currentUserPresence.activeSince = date;
		}

		socket.on("message", (event) => {
			console.log(`\nwebsocketHandler Message: ${event.data}\n`);
		});

		socket.on("close", (code) => {
			currentUserSession.socketSet?.delete(socket);
			if (currentUserSession.socketSet.size === 0)
			{
				currentUserPresence = userPresence.get(req.user.id);
				currentUserPresence.status = "offline";
				currentUserPresence.lastSeenAt = date;
				currentUserPresence.activeSince = null;
			}
			connectionsIndex.delete(socket);
			console.log(`\nwebsocketHandler socket.on close, code: ${code}\n`);
		});

	} catch (err) {
		console.error(`ERROR connectionHandler: ${err.message}\n`);
		socket.close();
		err.statusCode = 401;
		err.message = "Unhautorized"
		throw err;
	}
}

export const heartbeat = function () {
	console.log(`\nwebsocketHandler heartbeat\n`);
	connectionsIndex?.forEach((value, key) => {
		if (!key)
			return;
		console.log(`value.userId: ${value.userId}`);
		console.log(`value.connectionId: ${value.connectionId}`);
		console.log(`value.ip: ${value.ip}`);
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
