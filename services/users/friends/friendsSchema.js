import * as friendsController from './friendsController.js'

export const sendFriendRequestOpts = {
	schema: {
		response: {
			201: {
				type: "object",
				properties: {
					message: { type: "string" }
				}
			}
		}
	},
	handler: friendsController.sendFriendsRequest
}
