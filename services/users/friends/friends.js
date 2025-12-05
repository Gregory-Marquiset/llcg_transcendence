import * as friendsOpts from './friendsSchema.js'

async function friendsRoutes(app, options) {
	app.post('/friends/:targetId', { onReQuest: [app.authenticate], ...friendsOpts.sendFriendRequestOpts });
}

export { friendsRoutes };
