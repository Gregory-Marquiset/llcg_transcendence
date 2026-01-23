import * as chatController from './chatController.js';

export const createMessagesOpts = {
	schema: {
		body: {
			type: "object",
			properties: {
				fromUserId: { type: "integer" },
				toUserId: { type: "integer" },
				content: { type: "string" },
				requestId: { type: "string" },
				clientSentAt: { type: "string" }
			},
			required: ["fromUserId", "toUserId", "content", "requestId", "clientSentAt"]
		},
		response: {
			201: {
				type: "object",
				properties: {
					id: { type: "integer" },
					fromUserId: { type: "integer" },
					toUserId: { type: "integer" },
					content: { type: "string" },
					createdDate: { type: "string" },
					requestId: { type: "string" }
				}
			}
		}
	},
	handler: chatController.createMessage
}
