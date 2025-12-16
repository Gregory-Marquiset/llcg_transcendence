const connectionsIndex = new Map();
const sessionsByUser = new Map();
const userPresence = new Map();

let connectId = 0;

/* struct connectionsIndex :
{
	userId,
	connectionId,
	ip
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
		await req.jwtVerify();
		const date = new Date().toISOString();
		
		connectionsIndex.set(socket, {
			userId: req.user.id,
			connectionId: connectId++,
			ip: req.ip
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


		
		socket.addEventListener("message", (event) => {
			console.log(`\nwebsocketHandler Message: ${event.data}\n`);
		});

		socket.addEventListener("close", (event) => {

		});
	} catch (err) {
		console.error(`ERROR connectionHandler: ${err.message}\n`);
		socket.close();
		err.statusCode = 401;
		err.message = "Unhautorized"
		throw err;
	}
}
