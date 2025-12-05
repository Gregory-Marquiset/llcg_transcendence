import * as userOpts from './userSchema.js';

async function userRoutes(app, options) {
	app.patch('/user/me', { onRequest: [app.authenticate], ...userOpts.userMeOpts });

	app.post('/user/me/avatar', { onRequest: [app.authenticate], ...userOpts.userMeAvatarOpts });
}

export { userRoutes };
